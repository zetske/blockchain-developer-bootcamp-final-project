import React, { createContext, useState, useEffect, useContext } from 'react';
import { getEthersContracts, Contracts } from '../helpers/contractBooter';
import { chainIDToEndpoint } from '../../wallets/connectors';
import { JsonRpcProvider, Web3Provider } from '@ethersproject/providers';

interface ContextProps {
  contracts: Contracts;
  updateContractsEthers: (provider: any) => void;
}

export const ContractContext = createContext({} as ContextProps);

//TODO: initialize with Ethers

export function ContractProvider(props: any) {
  const [contracts, setContracts] = useState<Contracts>({} as Contracts);

  const initializeWeb3 = () => {
    let web3;
    if (process.env.NEXT_PUBLIC_CHAIN_ID) {
      web3 = new JsonRpcProvider(
        chainIDToEndpoint[process.env.NEXT_PUBLIC_CHAIN_ID]
      );
    } else {
      try {
        //@ts-ignore
        web3 = new Web3Provider(window.ethereum);
        //@ts-ignore
        window.ethereum.enable();
      } catch (error) {
        console.log(`window.ethereum does not exist!! Error: ${error}`);
        web3 = new JsonRpcProvider(chainIDToEndpoint['77']);
      }
    }
    return web3;
  };

  const initializeContracts = () => {
    const web3 = initializeWeb3();
    const contracts = getEthersContracts(web3);
    setContracts(contracts);
  };

  // const updateContractsWeb3 = (provider: any) => {
  //   const contracts = getWeb3Contracts(provider);
  //   setContracts(contracts);
  // };

  const updateContractsEthers = (provider: any) => {
    const contracts = getEthersContracts(provider);
    setContracts(contracts);
  };

  // ? on app start-up we use contractBooter to get web3 contracts. If you want ethers contracts on start-up call => getEthersContracts(provider)

  useEffect(() => {
    initializeContracts();
    // eslint-disable-next-line
  }, []);

  const value = { contracts, updateContractsEthers };
  return (
    <ContractContext.Provider value={value}>
      {props.children}
    </ContractContext.Provider>
  );
}

export function useContracts() {
  return useContext(ContractContext);
}

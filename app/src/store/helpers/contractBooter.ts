import { Contract, ContractInterface } from 'ethers';
import * as ABIs from '~/interfaces';
import { getAddress } from 'ethers/lib/utils';

export const checksumAddress = (address: string) => getAddress(address);

export interface Contracts {
  MyNFTContract: Contract;
}

// ? To "Boot" up a set of contracts, call this function and pass in a provider/web3 instance

export function getEthersContracts(provider: any) {
  const MyNFTContract = new Contract(
    checksumAddress(process.env.NEXT_PUBLIC_NFT as string),
    ABIs.MyNFT.abi as ContractInterface,
    provider
  );

  const contracts = {
    MyNFTContract
  };
  return contracts;
}

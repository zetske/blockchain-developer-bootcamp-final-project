import React, { useContext, useState, useEffect, createContext } from 'react';
import { useStore } from '../store';
import { isMetamaskEnabled } from '../../wallets/utils';
import { useWeb3React } from '@web3-react/core';
import { useToggle } from '../../hooks';
import { injectedConnector } from '../../wallets/connectors';
import { Metamask } from '../../components/Icons';
import { useContracts } from '../contractContext/contractContext';
import { Web3Provider } from '@ethersproject/providers';

interface ContextProps {
  wallet: any;
  showWalletModal: boolean;
  termsAccepted: boolean;
  showTermsModal: boolean;
  setShowTermsModal: React.Dispatch<React.SetStateAction<boolean>>;
  setTermsAccepted: React.Dispatch<React.SetStateAction<boolean>>;
  toggleWalletModal: () => void;
  disconnectWallet: (wallet: any) => void;
  setShowWalletModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleConnect: (wallet: any) => void;
  activatingConnector: any;
  chainIdIsCorrect: boolean;
  update: any;
  enabledWallets: {
    name: string;
    displayLabel: string;
    description: string;
    connectFunction: () => void;
    selected: boolean;
    activating: boolean;
    active: boolean;
    icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  }[];
}

interface Props {
  children: React.ReactNode;
}

export const WalletContext = createContext({} as ContextProps);

export default function WalletProvider(props: Props) {
  const { state, actions } = useStore();
  const { updateContractsEthers } = useContracts();
  const [showWalletModal, setShowWalletModal, toggleWalletModal] =
    useToggle(false);
  const [wallet, setWallet] = useState<any>(undefined);
  const [metamaskEnabled, setMetamaskEnabled] = useState(false);
  const [activatingConnector, setActivatingConnector] = useState<any>();
  const { connector, activate, deactivate, active, chainId, account } =
    useWeb3React();

  const [termsAccepted, setTermsAccepted] = useToggle(false);
  const [showTermsModal, setShowTermsModal] = useToggle(false);

  //? connect new signer to ocntracts when wallet changes
  const update = async () => {
    actions.setWalletAddress(account);
    //@ts-ignore
    let web3 = null;
    if (state.provider) {
      web3 = new Web3Provider(state.provider);
    }
    if (!state.provider && connector && active) {
      let { provider } = await connector.activate();
      web3 = new Web3Provider(provider);
    }
    if (web3) {
      updateContractsEthers(web3.getSigner());
    }
  };

  

  useEffect(() => {
    if (account && active) {
      update();
    }
    // eslint-disable-next-line
  }, [account, active]);

  //?first check for item on load
  useEffect(() => {
    if (window) {
      const hasAccepted = window.localStorage.getItem('termsAccepted');
      hasAccepted === 'true' && setTermsAccepted(true);
    }
  }, []);

  useEffect(() => {
    const enabled = isMetamaskEnabled();
    setMetamaskEnabled(enabled);
  }, []);

  useEffect(() => {
    if (account) {
      actions.setWalletAddress(account);
    }
    // eslint-disable-next-line
  }, [account]);

  useEffect(() => {
    if (state.isWalletConnected) {
      setShowWalletModal(false);
    }
    if (state.isWalletConnected && !termsAccepted) {
      setShowTermsModal(true);
    }
  }, [state.isWalletConnected]);

  // ? if you want the modal to close when there is a completed connection, use this useEffect below
  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
    active && account && setShowWalletModal(false);
  }, [activatingConnector, connector, active, setShowWalletModal]);

  const selectMetamask = () => {
    setWallet(injectedConnector);
    handleConnect(injectedConnector);
  };

  const disconnectWallet = async (activeWallet: any) => {
    deactivate();
    setActivatingConnector(undefined);
    actions.setWalletDisconnected();
  };

  const handleConnect = async (activatingWallet: any) => {
    try {
      setActivatingConnector(activatingWallet);
      await activate(activatingWallet);
      let { provider } = await activatingWallet.activate();
      //@ts-ignore
      let web3 = new Web3Provider(provider);
      actions.setProvider(provider);
      actions.setWalletConnected();
      setActivatingConnector(null);
      updateContractsEthers(web3.getSigner());
    } catch (err) {
      console.log('fail')
      // ? If user closes wallet popup modal, rejects connection
      disconnectWallet(activatingWallet);
    }
  };

  const wallets = [
    {
      name: 'metamask',
      displayLabel: 'Connect with Metamask',
      connectFunction: selectMetamask,
      selected: wallet === injectedConnector,
      activating: activatingConnector === injectedConnector,
      active: connector === injectedConnector,
      icon: Metamask,
      description: ''
    },
  ];

  const enabledWallets = !metamaskEnabled
    ? wallets.filter((wallet) => wallet.name !== 'metamask')
    : wallets;

  const chainIdIsCorrect =
    chainId && chainId.toString() === process.env.NEXT_PUBLIC_CHAIN_ID;

  const value = {
    showWalletModal,
    setShowWalletModal,
    setShowTermsModal,
    showTermsModal,
    termsAccepted,
    setTermsAccepted,
    toggleWalletModal,
    disconnectWallet,
    enabledWallets,
    handleConnect,
    activatingConnector,
    chainIdIsCorrect,
    wallet,
    update,
  };

  return (
    <WalletContext.Provider value={value}>
      {props.children}
    </WalletContext.Provider>
  );
}

export function useWallets() {
  return useContext(WalletContext);
}

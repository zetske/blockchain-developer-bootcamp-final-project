import { InjectedConnector } from '@web3-react/injected-connector';
import { TorusConnector } from '@web3-react/torus-connector';

export const supportedChains: { [key: number]: string } = {
  137: 'Matic Mainnet',
  80001: 'Mumbai Testnet',
};

export const chainIDToNetwork: { [key: string]: string } = {
  '0': 'Not connected',
  '1': 'Ethereum Mainnet',
  '4': 'Rinkeby Testnet',
  '5': 'Goerli Testnet',
  '77': 'Sokol Testnet',
  '100': 'xDai',
  '137': 'Matic Mainnet',
  '80001': 'Mumbai Testnet',
};

export const chainIDToEndpoint: { [key: string]: string } = {
  '0': '',
  '77': 'https://sokol.poa.network',
  '100': 'https://rpc.xdaichain.com/',
  '1337': 'http://localhost:8545/',
  '137': `https://polygon-mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_PROJECT_ID}`,
  '80001': `https://polygon-mumbai.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_PROJECT_ID}`,
};

// this will handle injected wallets such as MetaMask
export const injectedConnector = new InjectedConnector({
  supportedChainIds: [
    4, //rinkeby
  ],
});

export const chainIDToBlockExplorer: { [key: string]: string } = {
  '0': '',
  '1': 'https://etherscan.io',
  '4': 'https://rinkeby.etherscan.io',
  '77': 'https://blockscout.com/poa/sokol',
  '137': 'https://polygonscan.com/',
  '80001': 'https://mumbai.polygonscan.com/',
};

const initOptions = {
  enableLogging: process.env.NODE_ENV === 'production' ? false : true,
  whiteLabel: {
    theme: {
      isDark: true,
      colors: {
        torusBrand1: '#fcac94',
      },
    },
    logoDark: 'https://tkey.surge.sh/images/Device.svg', // Dark logo for light background
    logoLight: 'https://tkey.surge.sh/images/Device.svg', // Light logo for dark background
    topupHide: false,
    featuredBillboardHide: true,
    disclaimerHide: true,
    defaultLanguage: 'es',
  },
  network: {
    host: chainIDToEndpoint[process.env.NEXT_PUBLIC_CHAIN_ID],
    chainId: parseInt(process.env.NEXT_PUBLIC_CHAIN_ID),
    networkName: chainIDToNetwork[process.env.NEXT_PUBLIC_CHAIN_ID],
  },
};

const constructorOptions = {
  buttonPosition: 'bottom-left',
};

const loginOptions = {};

export const torus = new TorusConnector({
  chainId: parseInt(process.env.NEXT_PUBLIC_CHAIN_ID),
  initOptions,
  constructorOptions,
  loginOptions,
});

export const loadTorus = () => {
  const torus = new TorusConnector({
    chainId: parseInt(process.env.NEXT_PUBLIC_CHAIN_ID),
    initOptions,
    constructorOptions,
    loginOptions,
  });
  return torus;
};

// local chain IDs like 1337 are not supported by default by web3-react's portis connector (kak dom).
// You must pass in the url and chain id for your local chain/node as third config argument in constructor.

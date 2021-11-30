import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers'

export const isMetamaskEnabled: () => boolean = () => {
  try {
    if ((window as any).ethereum) {
      if ((window as any).ethereum.isMetaMask === true) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (error) {
    console.log(
      `Something went wrong while checking MetaMask installation. \nError => ${error}`
    );
    return false;
  }
};

export const enableAccount = async (provider: any) => {
  return await provider.enable();
};

export function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(
    provider,
    typeof provider.chainId === 'number'
      ? provider.chainId
      : typeof provider.chainId === 'string'
        ? parseInt(provider.chainId)
        : 'any'
  )
  library.pollingInterval = 15000
  return library
}

export function getSigner(library: Web3Provider, account: string): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked()
}


import '~/styles/main.scss';
import { StoreProvider } from '~/store/store';
import { Web3ReactProvider } from '@web3-react/core';
import { ContractProvider } from '~/store/contractContext/contractContext';
import WalletProvider from '~/store/walletContext/WalletContext';
import { getLibrary } from '~/wallets/utils';
import NextNprogress from 'nextjs-progressbar';

function MyApp({ Component, pageProps }: any) {
  return (
      <StoreProvider>
        <ContractProvider>
          <Web3ReactProvider getLibrary={getLibrary}>
            <WalletProvider>
                <NextNprogress
                  color="#fa9579"
                  startPosition={0.4}
                  stopDelayMs={200}
                  height={2}
                  showOnShallow={true}
                  options={{ showSpinner: false }}
                />
                <Component {...pageProps} />
            </WalletProvider>
          </Web3ReactProvider>
        </ContractProvider>
      </StoreProvider>
  );
}
export default MyApp;

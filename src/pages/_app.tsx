import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import {
  // configureChains, createClient, mainnet,
  WagmiConfig,
} from 'wagmi';
// import { bscTestnet, goerli } from 'wagmi/chains';
// import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
// import { publicProvider } from 'wagmi/providers/public';
import { ErrorBoundary } from './providers/ErrorBoundary';
import { client } from './providers/wagmi';

// const { chains, provider, webSocketProvider } = configureChains(
//   [mainnet, bscTestnet, goerli],
//   [publicProvider()],
// );

// const client = createClient({
//   autoConnect: true,
//   provider,
//   connectors: [
//     new MetaMaskConnector({ chains }),
//     // new InjectedConnector({
//     //   chains,
//     //   options: {
//     //     name: 'Injected',
//     //   },
//     // }),
//   ],
//   webSocketProvider,
// });

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ErrorBoundary>
      <WagmiConfig client={client}>
        <Component {...pageProps} />
      </WagmiConfig>
    </ErrorBoundary>
  );
};
export default App;

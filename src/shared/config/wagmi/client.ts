import { configureChains, createClient } from 'wagmi';
import { bsc, bscTestnet, goerli, mainnet } from 'wagmi/chains';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectLegacyConnector } from 'wagmi/connectors/walletConnectLegacy';
// import { WalletConnectConnector } from 'wagmi/dist/connectors/walletConnect';
// import { infuraProvider } from 'wagmi/providers/infura';
import { publicProvider } from 'wagmi/providers/public';

const { chains, provider, webSocketProvider } = configureChains(
  [mainnet, bsc, bscTestnet, goerli],
  [
    // TODO: FIX ME!!!
    publicProvider(),
    // infuraProvider({ apiKey: 'cccd0eba9e1a4186bf0c466e91d91419' }),
  ],
);

export const client = createClient({
  autoConnect: true,
  // https://lightrun.com/answers/wagmi-dev-wagmi-bug-using-wagmi-with-ssr-next-js-is-causing-styling-issues
  // persister: null,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'wagmi',
      },
    }),
    // new WalletConnectConnector({
    //   chains,
    //   options: {
    //     projectId: 'qubit-wallet',
    //   },
    // }),
    new WalletConnectLegacyConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected Connector',
        shimDisconnect: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
});

// import { getDefaultProvider } from 'ethers';
// import { createClient } from 'wagmi';
// export const client = createClient({
//   autoConnect: true,
//   provider: getDefaultProvider(),
// });

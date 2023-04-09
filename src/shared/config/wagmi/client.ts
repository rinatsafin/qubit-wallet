import { configureChains, createClient } from 'wagmi';
import { bsc, bscTestnet, goerli, mainnet, polygonMumbai, polygon, sepolia } from 'wagmi/chains';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectLegacyConnector } from 'wagmi/connectors/walletConnectLegacy';
// import { WalletConnectConnector } from 'wagmi/dist/connectors/walletConnect';
// import { infuraProvider } from 'wagmi/providers/infura';
import { publicProvider } from 'wagmi/providers/public';

const { chains, provider, webSocketProvider } = configureChains(
  [
    mainnet,
    bsc,
    // TODO: Need to clarify, but the library has an old link to Binance Smart Chain
    // {
    //   ...bsc,
    //   name: 'Binance Smart Chain',
    //   // nativeCurrency: {
    //   //   // override the default native currency
    //   //   // https://docs.bnbchain.org/docs/rpc/#bsc-mainnet-chainid-0x38-56-in-decimal
    //   //   ...bsc.nativeCurrency,
    //   //   decimals: 56,
    //   // },
    //   rpcUrls: {
    //     // Override the default RPC URL
    //     // New RPC URL: https://bsc-dataseed.binance.org/
    //     // https://academy.binance.com/en/articles/connecting-metamask-to-binance-smart-chain
    //     default: {
    //       http: ['https://bsc-dataseed.binance.org/'],
    //     },
    //     public: {
    //       http: ['https://bsc-dataseed.binance.org/'],
    //     },
    //   },
    // },
    bscTestnet,
    // TODO: Need to clarify, the name field does not match!
    // {
    //   ...bscTestnet,
    //   // Override the default name
    //   // https://academy.binance.com/en/articles/connecting-metamask-to-binance-smart-chain
    //   name: 'Smart Chain - Testnet',
    // },
    goerli,
    polygonMumbai,
    polygon,
    sepolia,
  ],
  [
    // TODO: FIX ME on PROD!!!
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

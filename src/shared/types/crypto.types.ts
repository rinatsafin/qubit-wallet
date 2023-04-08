import { bsc, bscTestnet, goerli, mainnet } from 'wagmi/chains';

export enum EChain {
  ETHEREUM = mainnet.id,
  BINANCE = bsc.id,
  BINANCE_TEST_NET = bscTestnet.id,
  GOERLI = goerli.id,
}

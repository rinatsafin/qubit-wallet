import { bsc, bscTestnet, goerli, mainnet, polygonMumbai, polygon, sepolia } from 'wagmi/chains';

export enum EChainId {
  ETHEREUM = mainnet.id,
  BINANCE = bsc.id,
  BINANCE_TESTNET = bscTestnet.id,
  GOERLI = goerli.id,
  POLYGON = polygon.id,
  POLYGON_MUMBAI = polygonMumbai.id,
  SEPOLIA = sepolia.id,
}

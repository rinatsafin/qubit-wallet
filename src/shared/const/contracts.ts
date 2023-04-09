import { FetchBalanceArgs } from '@wagmi/core';
// import { UseContractReadConfig } from 'wagmi';
import { EChainId } from '../types';

// CHR TOKEN is valid on BSC Testnet and ETH Mainnet
// https://etherscan.io/token/0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2
export const CHROMNIA_CONTRACT_ADDRESS = '0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2';
export const UNISWAP_CONTRACT_ADDRESS = '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984';
// const SUPPORTED_CONTRACTS_BY_SYMBOL = {
//   CHR: CHROMNIA_CONTRACT_ADDRESS,
//   tCHR: CHROMNIA_CONTRACT_ADDRESS,
//   UNI: UNISWAP_CONTRACT_ADDRESS,
// };

// TODO: Add more supported contracts
export const SUPPORTED_CONTRACTS_BY_CHAIN_ID: {
  [id: number]: FetchBalanceArgs['token'];
} = {
  [EChainId.ETHEREUM]: CHROMNIA_CONTRACT_ADDRESS,
  [EChainId.BINANCE_TESTNET]: CHROMNIA_CONTRACT_ADDRESS,
  [EChainId.GOERLI]: UNISWAP_CONTRACT_ADDRESS,
};

export const SUPPORTED_CURRENCY_NAME_BY_CONTRACTS_ADDRESS: { [key: string]: string } = {
  [CHROMNIA_CONTRACT_ADDRESS]: 'Chromnia',
  // TODO: Add more supported contracts
  // [UNISWAP_CONTRACT_ADDRESS]: 'UniSwap',
};

// NOTE: This is a sample of how to use the contract read config
// export const CHROMNIA_BALANCE_OF = 'balanceOf';
// export const CHROMNIA_CONTRACT_ABI_BY_METHOD = {
//   [CHROMNIA_BALANCE_OF]: 'function balanceOf(address) view returns (uint256)',
// };
// export const CHROMNIA_CONTRACT_READ_CONFIG: UseContractReadConfig = {
//   abi: [
//     CHROMNIA_CONTRACT_ABI_BY_METHOD[CHROMNIA_BALANCE_OF],
//   ] as unknown as UseContractReadConfig['abi'],
//   address: CHROMNIA_CONTRACT_ADDRESS,
//   functionName: CHROMNIA_BALANCE_OF,
//   args: [CHROMNIA_CONTRACT_ADDRESS] as const,
//   watch: false,
// };

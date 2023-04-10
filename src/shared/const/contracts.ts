import { FetchBalanceArgs, Address } from '@wagmi/core';
import { UseContractReadConfig, UsePrepareContractWriteConfig } from 'wagmi';
import { EChainId } from '../types';

// CHR TOKEN is valid on BSC Testnet and ETH Mainnet
// https://etherscan.io/token/0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2
export const CHROMNIA_CONTRACT_ADDRESS: Address = '0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2';
export const UNISWAP_CONTRACT_ADDRESS: Address = '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984';

// const SUPPORTED_CONTRACTS_BY_SYMBOL = {
//   CHR: CHROMNIA_CONTRACT_ADDRESS,
//   tCHR: CHROMNIA_CONTRACT_ADDRESS,
//   UNI: UNISWAP_CONTRACT_ADDRESS,
// };

// TODO: Add more supported contracts
export const SUPPORTED_CONTRACT_ADDRESS_BY_CHAIN_ID: {
  [key in EChainId]: FetchBalanceArgs['token'];
} = {
  [EChainId.ETHEREUM]: CHROMNIA_CONTRACT_ADDRESS,
  [EChainId.BINANCE_TESTNET]: CHROMNIA_CONTRACT_ADDRESS,
  [EChainId.GOERLI]: UNISWAP_CONTRACT_ADDRESS,
};

// TODO: Add more supported contracts
export const SUPPORTED_CURRENCY_NAME_BY_CONTRACTS_ADDRESS: { [key: Address]: string } = {
  [CHROMNIA_CONTRACT_ADDRESS]: 'Chromnia',
  [UNISWAP_CONTRACT_ADDRESS]: 'UniSwap',
};

export const SUPPORTED_CURRENCY_SYMBOL_BY_CHAIN_ID: { [key in EChainId]: string } = {
  [EChainId.ETHEREUM]: 'CHR',
  [EChainId.BINANCE_TESTNET]: 'tCHR',
  [EChainId.GOERLI]: 'UNI',
};

// NOTE: This is a sample of how to use the contract read config
export const CHROMNIA_BALANCE_OF = 'balanceOf';
export const CHROMNIA_CONTRACT_READ_CONFIG: UseContractReadConfig = {
  abi: [
    {
      constant: true,
      inputs: [{ name: 'owner', type: 'address' }],
      name: CHROMNIA_BALANCE_OF,
      outputs: [{ name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
  ] as const,
  address: CHROMNIA_CONTRACT_ADDRESS,
  functionName: CHROMNIA_BALANCE_OF,
  args: [CHROMNIA_CONTRACT_ADDRESS] as const,
  watch: true,
};

export const CONTRACT_WRITE_TRANSFER_CONFIG: UsePrepareContractWriteConfig = {
  enabled: false,
  abi: [
    {
      constant: false,
      inputs: [
        { name: 'to', type: 'address' },
        { name: 'value', type: 'uint256' },
      ],
      name: 'transfer',
      outputs: [{ name: '', type: 'bool' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
  ] as const,
  // address: CHROMNIA_CONTRACT_ADDRESS,
  functionName: 'transfer',
  // overrides: {
  //   // value: BigNumber.from(0.001 * 1e18),
  //   gasPrice: BigNumber.from(10 * 1e9),
  //   gasLimit: BigNumber.from(55486),
  // },
};

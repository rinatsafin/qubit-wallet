import {
  SUPPORTED_CONTRACT_ADDRESS_BY_CHAIN_ID,
  SUPPORTED_CURRENCY_SYMBOL_BY_CHAIN_ID,
} from '@/shared/const';
import { GetNetworkResult, Address, Chain } from '@wagmi/core';
import { ethers } from 'ethers';

export const checkIsSupportedContractByChain = (chain: GetNetworkResult['chain']) => {
  if (!chain || !chain?.nativeCurrency || chain.unsupported) return false;
  if (!SUPPORTED_CONTRACT_ADDRESS_BY_CHAIN_ID[chain.id]) return false;
  return true;
};

export function getCurrenciesOptionsByChain(chain: Chain) {
  const defaultOption = {
    symbol: chain.nativeCurrency.symbol,
  };
  const contractCurrencySymbol = SUPPORTED_CURRENCY_SYMBOL_BY_CHAIN_ID[chain.id];
  if (!contractCurrencySymbol) return [defaultOption];
  const options = [defaultOption, { symbol: contractCurrencySymbol }];
  return options;
}

export const getNetworkOptions = ({
  chains,
  chain,
  isLoading,
  pendingChainId,
  isSwitchNetworkSupported,
}: {
  chains: Chain[];
  chain: Chain;
  isLoading: boolean;
  pendingChainId?: number;
  isSwitchNetworkSupported: boolean;
}) => {
  return chains.map((network) => {
    const isDefaultSelected = chain.id === network.id;
    const postfix = isLoading && network.id === pendingChainId ? '…' : '';
    const text = isDefaultSelected
      ? `Selected ${network.name}`
      : `Switch to ${network.name} ${postfix}`;
    return {
      title: <p key={`${network.id}-${network.name}`}>{text}</p>,
      id: network.id,
      isDisabled: !isSwitchNetworkSupported || network.id === chain?.id,
      data: { id: network.id, isSupported: isSwitchNetworkSupported },
    };
  });
};

export const getAmountInBigNumber = (amount: string, decimals: number) => {
  if (Number(amount) <= 0 || Number.isNaN(Number(amount)))
    return ethers.utils.parseUnits('0', decimals);
  const amountInBigNumber = ethers.utils.parseUnits(amount, decimals);
  return amountInBigNumber;
};

export const isValidEtherAddress = (address: string): address is Address => {
  const trimmedAddress = address.trim();
  return /^0x[a-fA-F0-9]{40}$/g.test(trimmedAddress);
};

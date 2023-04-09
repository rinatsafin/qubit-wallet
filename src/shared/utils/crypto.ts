import { SUPPORTED_CONTRACTS_BY_CHAIN_ID } from '@/shared/const';
import { GetNetworkResult } from '@wagmi/core';

export const checkIsSupportedContractByChain = (chain: GetNetworkResult['chain']) => {
  if (!chain || !chain?.nativeCurrency || chain.unsupported) return false;
  if (!SUPPORTED_CONTRACTS_BY_CHAIN_ID[chain.id]) return false;
  return true;
};

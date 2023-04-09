import { EChainId } from '@/shared/types';
import { type FC } from 'react';
import { Chain } from 'wagmi';
import { SiBinance, SiEthereum } from 'react-icons/si';
import { ChromniaCurrencyIcon } from '@/shared/components';
import { FetchBalanceArgs } from '@wagmi/core';
import { SUPPORTED_CURRENCY_NAME_BY_CONTRACTS_ADDRESS } from '@/shared/const';

interface CurrencyIconProps {
  chainId?: Chain['id'];
  // TODO: FIX ME!!!!
  token?: FetchBalanceArgs['token'];
}

const CurrencyIcon: FC<CurrencyIconProps> = ({ chainId, token }) => {
  // TODO: This is a temporary solution that should definitely be passed on.
  if (token && SUPPORTED_CURRENCY_NAME_BY_CONTRACTS_ADDRESS[token]) return <ChromniaCurrencyIcon />;
  switch (chainId) {
    case EChainId.BINANCE:
    case EChainId.BINANCE_TESTNET:
      return <SiBinance fontSize={21} />;
    case EChainId.ETHEREUM:
    case EChainId.GOERLI:
    default:
      return <SiEthereum fontSize={21} />;
  }
};

export default CurrencyIcon;

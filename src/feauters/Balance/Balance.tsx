/* eslint-disable no-debugger */
import type { GetAccountResult, Provider } from '@wagmi/core';
import { type FC } from 'react';
import { Chain, useBalance } from 'wagmi';

interface BalanceProps {
  chain: Chain;
  address: GetAccountResult<Provider>['address'];
}

// TODO: Move into shared types folder
enum ETokenDecimal {
  ETH = 18,
  // BNB = 18,
  // TBNB = 18
  // add more tokens and their decimals here
}

const TOKENS_DECIMALS: {
  [key in Chain['nativeCurrency']['symbol']]: number;
} = {
  ETH: ETokenDecimal.ETH,
  BNB: ETokenDecimal.ETH,
  tBNB: ETokenDecimal.ETH,
  AVAX: ETokenDecimal.ETH,
  tBRO: ETokenDecimal.ETH,
  CRO: ETokenDecimal.ETH,
};

const MIN_BALANCE_LENGTH = 6;

const Balance: FC<BalanceProps> = ({ chain, address }) => {
  const { nativeCurrency, id } = chain;
  const tokenDecimal =
    nativeCurrency?.name in TOKENS_DECIMALS
      ? TOKENS_DECIMALS[nativeCurrency.symbol as keyof typeof TOKENS_DECIMALS]
      : ETokenDecimal.ETH;
  const { data, isLoading, error } = useBalance({
    enabled: false,
    address,
    chainId: id,
    formatUnits: tokenDecimal ?? ETokenDecimal.ETH,
    watch: true,
  });
  if (!nativeCurrency) return <p className='mt-1 text-lg font-semibold'>Etherium</p>;
  return (
    <div className='flex flex-col items-start justify-between'>
      <p className='mt-1 text-lg font-semibold'>Currency {nativeCurrency.name}</p>
      <div className='mt-1 flex text-lg font-semibold'>
        <p>
          {isLoading && 'Loading balance...'}
          {!isLoading && error && 'Error loading balance'}
          {!isLoading &&
            !error &&
            data &&
            `Balance ${data?.formatted.slice(0, MIN_BALANCE_LENGTH)} ${data?.symbol}`}
        </p>
      </div>
    </div>
  );
};

export default Balance;

import { type FC, memo, ReactElement, ReactNode } from 'react';
// import { GetNetworkResult, GetAccountResult, Provider, FetchBalanceArgs } from '@wagmi/core';

interface BalanceViewProps {
  networkName?: string;
  isUnsupportedNetwork?: boolean;
  isLoading?: boolean;
  error?: Error | null;
  formattedBalance?: string | JSX.Element | ReactElement | ReactNode;
  // chain: GetNetworkResult['chain'];
  // address: FetchBalanceArgs['address'];
  // token?: FetchBalanceArgs['token'];
}

const BalanceView: FC<BalanceViewProps> = ({
  formattedBalance,
  isUnsupportedNetwork,
  isLoading,
  error,
  networkName,
}) => {
  if (isUnsupportedNetwork)
    return <p className='mt-1 text-lg font-semibold text-pink-500'>Unsupported network</p>;
  return (
    <div className='flex flex-col items-start justify-between'>
      <p className='mt-1 text-lg font-semibold'>Network {networkName}</p>
      <div className='mt-1 flex text-lg font-semibold'>
        <p>
          {isLoading && 'Loading balance...'}
          {!isLoading && error && 'Error loading balance'}
          {!isLoading && !error && formattedBalance}
        </p>
      </div>
    </div>
  );
};

export default memo(BalanceView);

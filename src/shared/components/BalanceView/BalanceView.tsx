import { type FC, memo, ReactElement, ReactNode } from 'react';

interface BalanceViewProps {
  networkName?: string;
  isUnsupportedNetwork?: boolean;
  isLoading?: boolean;
  error?: Error | null;
  formattedBalance?: string | JSX.Element | ReactElement | ReactNode;
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
      <div className='mt-1 flex'>
        <p className='text-lg font-semibold'>Network</p>
        <p className='ml-2'>{networkName}</p>
      </div>
      <div className='mt-1 flex'>
        <p className='text-lg font-semibold'>Balance</p>
        <p className='ml-2'>
          {isLoading && 'Loading balance...'}
          {!isLoading && error && 'Error loading balance'}
          {!isLoading && !error && formattedBalance}
        </p>
      </div>
    </div>
  );
};

export default memo(BalanceView);

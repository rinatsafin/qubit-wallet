import { type FC } from 'react';
import { BsInfoCircle } from 'react-icons/bs';
import { getEllipsisText } from '@/shared/utils';
import type { GetNetworkResult, GetAccountResult, Provider, FetchBalanceArgs } from '@wagmi/core';
import { CurrencyIcon } from '@/shared/components';
import { Balance } from '@/feauters';
import clsx from 'clsx';

interface CryptoCardContentProps {
  chain: GetNetworkResult['chain'];
  address: GetAccountResult<Provider>['address'];
  token?: FetchBalanceArgs['token'];
  title?: string;
  className?: string;
}

const CryptoCard: FC<CryptoCardContentProps> = ({
  chain,
  address,
  title = 'Address',
  token,
  className,
}) => {
  return (
    <div
      className={clsx(
        token ? 'contract-card' : 'crypto-card',
        'white-glassmorphism mt-6 h-40 w-full flex-col items-start justify-end rounded-xl p-3 sm:w-72',
        className,
      )}
    >
      <div className='flex h-full w-full flex-col justify-between'>
        <div className='flex items-start justify-between'>
          <div className='flex h-10 w-10 items-center justify-center rounded-full border-2'>
            <CurrencyIcon chainId={chain?.id} token={token} />
          </div>
          <BsInfoCircle fontSize={21} />
        </div>
        <div>
          <div className='flex items-start justify-start text-sm'>
            <p>{title}</p>
            <p className='ml-1 font-light'>{address && getEllipsisText(address)}</p>
          </div>
          <Balance chain={chain} address={address} token={token} />
        </div>
      </div>
    </div>
  );
};
export default CryptoCard;

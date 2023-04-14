import { type FC } from 'react';
import { useNetwork } from 'wagmi';
import NetworkSwitcherDropdown from './NetworkSwitcherDropdown';

const NetworkSwitcher: FC = () => {
  const { chain } = useNetwork();

  if (!chain) return null;
  return (
    <div className='w-full text-white'>
      {chain?.unsupported ? (
        <>
          <div className='text-ellipsis py-1 text-xl text-red-500 sm:text-3xl'>
            Unsupported network
          </div>
          <p className='mt-1 font-light text-gray-300'>
            Please switch to one of the supported networks
          </p>
        </>
      ) : (
        <NetworkSwitcherDropdown chain={chain} />
      )}
    </div>
  );
};

export default NetworkSwitcher;

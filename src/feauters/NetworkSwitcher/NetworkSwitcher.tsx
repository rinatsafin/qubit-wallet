import { Dropdown, DropdownOption } from '@/shared/components';
import { useIsMounted } from '@/shared/hooks';
import { type FC } from 'react';
import { useNetwork, useSwitchNetwork } from 'wagmi';
import { getNetworkOptions } from '@/shared/utils';
import { DEFAULT_NETWORK_SWITCHER_OPTION } from './const';

const NetworkSwitcher: FC = () => {
  const { chain } = useNetwork();
  const { chains, error, isLoading, pendingChainId, switchNetwork } = useSwitchNetwork({
    throwForSwitchChainNotSupported: true,
    chainId: chain?.id,
  });
  const isMounted = useIsMounted();
  if (!isMounted || !chain) return null;
  const networkOptions = getNetworkOptions({
    chains,
    chain,
    isLoading,
    pendingChainId,
    isSwitchNetworkSupported: !!switchNetwork,
  });
  const handleChange = (option: DropdownOption) => {
    // we must filter default option id
    if (option.id === DEFAULT_NETWORK_SWITCHER_OPTION.id) return;
    switchNetwork?.(option.id);
  };
  const defaultSelectedOption = networkOptions.find((net) => net.id === chain?.id);
  const isDefaultSelected = defaultSelectedOption?.id != null;
  return (
    <div className='w-full text-white'>
      {!chain || chain.unsupported ? (
        <>
          <div className='text-ellipsis py-1 text-xl text-red-500 sm:text-3xl'>
            Unsupported network
          </div>
          <p className='mt-1 font-light text-gray-300'>
            Please switch to one of the supported networks
          </p>
        </>
      ) : (
        <div className='text-ellipsis py-1 text-xl sm:text-2xl'>Using {chain.name}</div>
      )}
      <Dropdown
        defaultOption={isDefaultSelected ? defaultSelectedOption : DEFAULT_NETWORK_SWITCHER_OPTION}
        options={networkOptions}
        onChange={handleChange}
        className='mt-2'
      />
      {error && <div className='mt-1 text-red-500'>{error?.message ?? 'Failed to switch'}</div>}
    </div>
  );
};

export default NetworkSwitcher;

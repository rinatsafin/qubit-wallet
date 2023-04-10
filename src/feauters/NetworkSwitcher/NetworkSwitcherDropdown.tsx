import { Dropdown, DropdownOption } from '@/shared/components';
import { getNetworkOptions } from '@/shared/utils';
import { Chain, useSwitchNetwork } from 'wagmi';
import { type FC } from 'react';
import { DEFAULT_NETWORK_SWITCHER_OPTION } from './const';

const NetworkSwitcherDropdown: FC<{ chain: Chain }> = ({ chain }) => {
  const { chains, error, isLoading, pendingChainId, switchNetwork } = useSwitchNetwork({
    throwForSwitchChainNotSupported: true,
    chainId: chain.id,
  });
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
    <>
      <div className='text-ellipsis py-1 text-xl sm:text-2xl'>Using {chain.name}</div>
      <Dropdown
        defaultOption={isDefaultSelected ? defaultSelectedOption : DEFAULT_NETWORK_SWITCHER_OPTION}
        options={networkOptions}
        onChange={handleChange}
        className='mt-2'
      />
      {error && <div className='mt-1 text-red-500'>{error?.message ?? 'Failed to switch'}</div>}
    </>
  );
};

export default NetworkSwitcherDropdown;

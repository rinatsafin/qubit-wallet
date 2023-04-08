import { Dropdown } from '@/shared/components';
import { useIsMounted } from '@/shared/hooks';
import { type FC } from 'react';
import { useNetwork, useSwitchNetwork } from 'wagmi';

const DEFAULT_OPTION = { title: 'Select a network', id: 0 };

const NetworkSwitcher: FC = () => {
  const { chain } = useNetwork();
  const { chains, error, isLoading, pendingChainId, switchNetwork } = useSwitchNetwork({
    throwForSwitchChainNotSupported: true,
    chainId: chain?.id,
  });
  const isMounted = useIsMounted();
  const handleChange = (option: { id: number }) => {
    // we must filter default option id
    if (option.id === DEFAULT_OPTION.id) return;
    switchNetwork?.(option.id);
  };
  if (!isMounted || !chain) return null;
  const getNetworkOption = () => {
    return chains.map((network) => {
      const isDefaultSelected = chain.id === network.id;
      const postfix = isLoading && network.id === pendingChainId ? '…' : '';
      const text = isDefaultSelected
        ? `Selected ${network.name}`
        : `Switch to ${network.name} ${postfix}`;
      return {
        title: <p key={`${network.id}-${network.name}`}>{text}</p>,
        id: network.id,
        isDisabled: !switchNetwork || network.id === chain?.id,
      };
    });
  };
  const networkOptions = getNetworkOption();
  const defaultOption = networkOptions.find((net) => net.id === chain?.id) || DEFAULT_OPTION;
  return (
    <div className='w-full text-white'>
      {chain && <div className='text-ellipsis py-1 text-xl sm:text-2xl'>Using {chain.name}</div>}
      <Dropdown
        defaultOption={defaultOption}
        options={getNetworkOption()}
        onChange={handleChange}
      />
      <div className='mt-1 text-red-400'>{error && (error?.message ?? 'Failed to switch')}</div>
    </div>
  );
};

export default NetworkSwitcher;

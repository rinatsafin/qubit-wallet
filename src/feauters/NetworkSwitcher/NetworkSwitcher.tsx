import { Dropdown } from '@/shared/components';
import { useIsMounted } from '@/shared/hooks';
import { type FC } from 'react';
import { Chain, useNetwork, useSwitchNetwork } from 'wagmi';
import { DEFAULT_NETWORK_SWITCHER_OPTION } from './const';

// TODO: Move into utils
const getNetworkOptions = ({
  chains,
  chain,
  isLoading,
  pendingChainId,
  isSwitchNetworkSupported,
}: {
  chains: Chain[];
  chain: Chain;
  isLoading: boolean;
  pendingChainId?: number;
  isSwitchNetworkSupported: boolean;
}) => {
  return chains.map((network) => {
    const isDefaultSelected = chain.id === network.id;
    const postfix = isLoading && network.id === pendingChainId ? '…' : '';
    const text = isDefaultSelected
      ? `Selected ${network.name}`
      : `Switch to ${network.name} ${postfix}`;
    return {
      title: <p key={`${network.id}-${network.name}`}>{text}</p>,
      id: network.id,
      isDisabled: !isSwitchNetworkSupported || network.id === chain?.id,
    };
  });
};

const NetworkSwitcher: FC = () => {
  const { chain } = useNetwork();
  const { chains, error, isLoading, pendingChainId, switchNetwork } = useSwitchNetwork({
    throwForSwitchChainNotSupported: true,
    chainId: chain?.id,
  });
  const isMounted = useIsMounted();
  const handleChange = (option: { id: number }) => {
    // we must filter default option id
    if (option.id === DEFAULT_NETWORK_SWITCHER_OPTION.id) return;
    switchNetwork?.(option.id);
  };
  if (!isMounted || !chain) return null;
  const networkOptions = getNetworkOptions({
    chains,
    chain,
    isLoading,
    pendingChainId,
    isSwitchNetworkSupported: !!switchNetwork,
  });
  const defaultOption = networkOptions.find((net) => net.id === chain?.id);
  const isDefaultSelected = defaultOption?.id != null;
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
        defaultOption={isDefaultSelected ? defaultOption : DEFAULT_NETWORK_SWITCHER_OPTION}
        options={networkOptions}
        onChange={handleChange}
        className='mt-2'
      />
      {error && <div className='mt-1 text-red-500'>{error?.message ?? 'Failed to switch'}</div>}
    </div>
  );
};

export default NetworkSwitcher;

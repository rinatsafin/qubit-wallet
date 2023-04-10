import { BalanceView } from '@/shared/components';
import { MAX_BALANCE_LENGTH } from '@/shared/const';
import type { FetchBalanceArgs, GetAccountResult, GetNetworkResult, Provider } from '@wagmi/core';
import { type FC } from 'react';
import { useBalance } from 'wagmi';

interface BalanceProps {
  chain: GetNetworkResult['chain'];
  address: GetAccountResult<Provider>['address'];
  token?: FetchBalanceArgs['token'];
}

const Balance: FC<BalanceProps> = ({ chain, address, token }) => {
  const { nativeCurrency, id, unsupported } = chain || {};
  const { data, isLoading, error } = useBalance({
    address,
    chainId: id,
    formatUnits: !token ? nativeCurrency?.decimals : undefined,
    token,
    watch: true,
  });
  const { formatted, symbol } = data || {};
  const formattedBalance = formatted
    ? `Balance ${formatted?.slice(0, MAX_BALANCE_LENGTH)} ${symbol}`
    : '';

  return (
    <BalanceView
      isUnsupportedNetwork={unsupported}
      isLoading={isLoading}
      error={error}
      formattedBalance={formattedBalance}
      networkName={nativeCurrency?.name}
    />
  );
};

export default Balance;

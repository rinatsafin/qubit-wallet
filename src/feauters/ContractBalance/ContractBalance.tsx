import { BalanceView } from '@/shared/components';
import { MAX_BALANCE_LENGTH } from '@/shared/const';
import type { GetAccountResult, GetNetworkResult, Provider } from '@wagmi/core';
import { type FC } from 'react';
import { useBalance } from 'wagmi';

interface ContractBalanceProps {
  chain: GetNetworkResult['chain'];
  address: GetAccountResult<Provider>['address'];
  token?: GetAccountResult<Provider>['address'];
}

const ContractBalance: FC<ContractBalanceProps> = ({ chain, address, token }) => {
  // const [contractBalance, setContractBalance] = useState<FetchBalanceResult>();
  const { nativeCurrency, id, unsupported } = chain || {};
  // 0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2
  const { data, isLoading, error } = useBalance({
    address,
    token,
    chainId: id,
  });

  if (!data) return null;
  const formattedBalance =
    data && `Balance ${data.formatted.toString().slice(0, MAX_BALANCE_LENGTH)} ${data.symbol}`;
  return (
    <BalanceView
      isUnsupportedNetwork={unsupported || !nativeCurrency}
      isLoading={isLoading}
      error={error}
      formattedBalance={formattedBalance}
    />
  );
};

export default ContractBalance;

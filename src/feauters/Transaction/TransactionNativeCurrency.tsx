import { TransactionForm } from '@/shared/components';
import { getAmountInBigNumber, isValidEtherAddress } from '@/shared/utils';
import { type FC, type FormEvent, useState } from 'react';
import { useSendTransaction, useBalance, Address, Chain } from 'wagmi';

interface TransactionNativeCurrencyProps {
  chain?: Chain & {
    unsupported?: boolean;
  };
  address?: Address;
  amountStep: string;
}

const TransactionNativeCurrency: FC<TransactionNativeCurrencyProps> = ({
  chain,
  address,
  amountStep,
}) => {
  const { nativeCurrency, id, unsupported } = chain || {};
  const { data } = useBalance({
    address,
    chainId: id,
    formatUnits: nativeCurrency?.decimals,
    watch: true,
  });

  const [formData, setFormData] = useState<{
    addressTo: string;
    amount: string;
  }>({
    addressTo: '',
    amount: amountStep,
  });
  const isValidAddress = isValidEtherAddress(formData.addressTo);
  // TODO: Use the config from usePrepareSendTransaction
  const { sendTransactionAsync, error, isLoading } = useSendTransaction({
    chainId: id,
    request:
      isValidAddress && nativeCurrency?.decimals
        ? {
            to: formData.addressTo,
            value: getAmountInBigNumber(formData.amount, nativeCurrency?.decimals),
          }
        : undefined,
    // NOTE: The value "recklesslyUnprepared" is used only for testing purposes,
    // please change this in production
    // You should set to the default gas price and gas limit in usePrepareSendTransaction
    mode: 'recklesslyUnprepared',
  });
  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const onFromSubmit = async (_fromEvent: FormEvent<HTMLFormElement>) => {
    if (sendTransactionAsync) await sendTransactionAsync();
  };

  return (
    <TransactionForm
      disabled={chain?.unsupported}
      amountStep={amountStep}
      formData={formData}
      isLoading={isLoading}
      maxAmount={data?.formatted ?? '0'}
      onFormSubmit={onFromSubmit}
      onInputChange={onInputChange}
      unsupported={unsupported}
      symbol={nativeCurrency?.symbol || 'ETH'}
      errorMessage={error?.message}
    />
  );
};

export default TransactionNativeCurrency;

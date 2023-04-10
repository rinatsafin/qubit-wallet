import { TransactionForm } from '@/shared/components';
import { getAmountInBigNumber, isValidEtherAddress } from '@/shared/utils';
import { FC, FormEvent, useState } from 'react';
import { useBalance, usePrepareContractWrite, useContractWrite, Chain, Address } from 'wagmi';
import { CONTRACT_WRITE_TRANSFER_CONFIG } from '@/shared/const';

interface TransactionContractCurrencyProps {
  token: Address;
  chain: Chain;
  address: Address;
  amountStep: string;
}

const TransactionContractCurrency: FC<TransactionContractCurrencyProps> = ({
  token,
  chain,
  address,
  amountStep,
}) => {
  const { id } = chain;
  const { data, error: balanceError } = useBalance({
    address,
    chainId: id,
    token,
    watch: true,
  });
  const [formData, setFormData] = useState<{
    addressTo: Address;
    amount: string;
  }>({
    // TODO: Unfortunately, the interface requires strict verification, and had to use such a hack.
    addressTo: '' as Address,
    amount: amountStep,
  });
  const isValidAddress = isValidEtherAddress(formData.addressTo);
  const isValidAmount = !Number.isNaN(Number(formData.amount));
  const isValidaArgs = data?.decimals && isValidAddress && isValidAmount;
  const { config } = usePrepareContractWrite({
    ...CONTRACT_WRITE_TRANSFER_CONFIG,
    address: token,
    args: isValidaArgs
      ? [formData.addressTo, getAmountInBigNumber(formData.amount, data?.decimals)]
      : undefined,
  });
  const { isLoading, writeAsync, error } = useContractWrite({
    ...config,
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
    if (!writeAsync) return;
    await writeAsync();
  };

  if (!data) return null;
  return (
    <TransactionForm
      amountStep={amountStep}
      formData={formData}
      isLoading={isLoading}
      maxAmount={data.formatted}
      onFormSubmit={onFromSubmit}
      onInputChange={onInputChange}
      symbol={data.symbol}
      errorMessage={error?.message || balanceError?.message}
    />
  );
};

export default TransactionContractCurrency;

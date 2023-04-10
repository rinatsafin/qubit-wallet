/* eslint-disable no-debugger */
import { Address, GetNetworkResult } from '@wagmi/core';
import { Input, Loader } from '@/shared/components';
import { getAmountInBigNumber, isValidEtherAddress } from '@/shared/utils';
import { FC, FormEvent, useState } from 'react';
import { useBalance, usePrepareContractWrite, useContractWrite } from 'wagmi';
import { CONTRACT_WRITE_TRANSFER_CONFIG } from '@/shared/const';

type ValidationError = { text: string; errorType: string };

interface SendTransactionContractCurrencyProps {
  token: Address;
  chain: GetNetworkResult['chain'];
  address: Address;
  amountStep: string;
}

const SendTransactionContractCurrency: FC<SendTransactionContractCurrencyProps> = ({
  token,
  chain,
  address,
  amountStep,
}) => {
  const { id, unsupported } = chain || {};
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
    addressTo: '' as Address,
    amount: amountStep,
  });
  const [sendTransactionErrors, setSendTransactionErrors] = useState<ValidationError[]>([]);
  const [sendTransactionSuccess, setSendTransactionSuccess] = useState<string | null>(null);
  const isValidAddress = isValidEtherAddress(formData.addressTo);
  const isValidaArgs = data?.decimals && isValidAddress && !Number.isNaN(Number(formData.amount));
  const { config } = usePrepareContractWrite({
    ...CONTRACT_WRITE_TRANSFER_CONFIG,
    address: token,
    args: isValidaArgs
      ? [formData.addressTo, getAmountInBigNumber(formData.amount, data?.decimals)]
      : undefined,
  });
  const { isLoading, writeAsync, reset, error } = useContractWrite({
    ...config,
    mode: 'recklesslyUnprepared',
  });
  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSendTransactionErrors([]);
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleOnFromSubmit = async (fromEvent: FormEvent<HTMLFormElement>) => {
    fromEvent?.preventDefault();
    setSendTransactionErrors([]);
    setSendTransactionSuccess('');
    if (!writeAsync) return;
    const validationErrors: ValidationError[] = [];
    // Validate the form data before sending the transaction
    if (isLoading) {
      validationErrors.push({
        text: 'Transaction is in progress',
        errorType: 'isLoading',
      });
    }
    if (unsupported) {
      validationErrors.push({
        text: 'Unsupported network, Please select another network!',
        errorType: 'unsupported',
      });
    }
    if (!isValidAddress) {
      validationErrors.push({ text: 'Invalid address format', errorType: 'invalid_address' });
    }
    const amountValue = Number(formData.amount);
    if (amountValue <= 0 || Number.isNaN(amountValue)) {
      validationErrors.push({ text: 'Amount must be greater than zero', errorType: 'less_zero' });
    }
    if (!data?.formatted || (data?.formatted && amountValue > Number(data.formatted))) {
      validationErrors.push({ text: 'Insufficient balance', errorType: 'insufficient_balance' });
    }
    if (validationErrors.length > 0) {
      setSendTransactionErrors((prevState) => {
        return [...prevState, ...validationErrors];
      });
      return;
    }
    try {
      await writeAsync();
      setSendTransactionSuccess('Transaction sent successfully!');
      reset();
    } catch (sendTransactionAsyncError) {
      console.error(sendTransactionAsyncError);
      setSendTransactionErrors((prevState) => {
        return [
          ...prevState,
          {
            text: 'Transaction failed, please try again.',
            errorType: 'sendTransactionAsyncError',
          },
        ];
      });
    }
  };

  return (
    <>
      <form onSubmit={handleOnFromSubmit} className='mt-2 w-full'>
        <Input
          label='To Address'
          placeholder='Enter To Address'
          name='addressTo'
          type='text'
          value={formData.addressTo}
          disabled={unsupported}
          onChange={onInputChange}
        />
        <Input
          label={`Amount (${data?.symbol})`}
          placeholder='Enter Amount'
          name='amount'
          type='number'
          step={amountStep}
          value={formData.amount}
          onChange={onInputChange}
          disabled={unsupported}
        />
        <div className='my-3 h-[1px] w-full bg-gray-400' />
        {isLoading ? (
          <Loader />
        ) : (
          <button
            className='mt-2 flex w-full justify-center rounded-full border-[1px] border-[#3d4f7c] p-2 hover:border-[#8f3fc4]'
            type='submit'
          >
            Send token
          </button>
        )}
      </form>
      {sendTransactionErrors.length > 0 &&
        sendTransactionErrors.map((err) => (
          <div key={err.errorType} className='mt-1 text-red-400'>
            {err.text}
          </div>
        ))}
      {sendTransactionSuccess && (
        <div className='mt-1 text-green-500'>{sendTransactionSuccess}</div>
      )}
      {balanceError && (
        <>
          <div className='mt-2 h-[1px] w-full bg-gray-400' />
          <div className='mt-2 flex w-full border-[2px] border-red-600 p-2'>
            {balanceError.message}
          </div>
        </>
      )}
      {error && (
        <>
          <div className='mt-2 h-[1px] w-full bg-gray-400' />
          <div className='mt-2 flex w-full border-[2px] border-red-600 p-2'>{error.message}</div>
        </>
      )}
    </>
  );
};

export default SendTransactionContractCurrency;

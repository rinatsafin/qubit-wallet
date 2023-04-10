import { Input, Loader } from '@/shared/components';
import { isValidEtherAddress } from '@/shared/utils';
import { ChangeEvent, ChangeEventHandler, FC, FormEvent, useState, Fragment, Key } from 'react';

interface TransactionFormProps {
  onFormSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  isLoading: boolean;
  onInputChange: ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
  errorMessage?: string | null;
  formData: {
    addressTo: string;
    amount: string;
  };
  amountStep: string;
  symbol: string;
  unsupported?: boolean;
  maxAmount: string;
  key?: Key;
}

type TransactionValidationError = { text: string; errorType: string };

const TransactionForm: FC<TransactionFormProps> = ({
  onFormSubmit,
  onInputChange,
  isLoading,
  disabled,
  errorMessage,
  formData,
  amountStep,
  symbol,
  unsupported,
  maxAmount,
  key,
}) => {
  const [sendTransactionErrors, setSendTransactionErrors] = useState<TransactionValidationError[]>(
    [],
  );
  const [sendTransactionSuccess, setSendTransactionSuccess] = useState<string | null>(null);
  const onValidationForm = () => {
    const validationErrors: TransactionValidationError[] = [];
    if (isLoading) {
      validationErrors.push({
        text: 'Transaction is in progress',
        errorType: 'loading',
      });
    }
    if (unsupported) {
      validationErrors.push({
        text: 'Unsupported network, Please select another network!',
        errorType: 'unsupported',
      });
    }
    if (!isValidEtherAddress(formData.addressTo)) {
      validationErrors.push({ text: 'Invalid address format', errorType: 'invalid_address' });
    }
    const amountValue = Number(formData.amount);
    if (amountValue <= 0 || Number.isNaN(amountValue)) {
      validationErrors.push({ text: 'Amount must be greater than zero', errorType: 'sub_zero' });
    }
    if (!maxAmount || (maxAmount && amountValue > Number(maxAmount))) {
      validationErrors.push({ text: 'Insufficient balance', errorType: 'insufficient_balance' });
    }
    if (validationErrors.length > 0) {
      setSendTransactionErrors((prevState) => {
        return [...prevState, ...validationErrors];
      });
    }
    return validationErrors;
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSendTransactionErrors([]);
    setSendTransactionSuccess('');
    if (onValidationForm().length > 0) return;
    try {
      await onFormSubmit(event);
      setSendTransactionSuccess('Transaction sent successfully!');
    } catch (submitError) {
      console.error(submitError);
      setSendTransactionErrors((prevState) => {
        return [
          ...prevState,
          {
            text: 'Transaction failed, please try again.',
            errorType: 'send_transaction',
          },
        ];
      });
    }
  };
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSendTransactionErrors([]);
    setSendTransactionSuccess('');
    if (event) onInputChange(event);
  };

  return (
    <Fragment key={key}>
      <form onSubmit={onSubmit} className='mt-2 w-full'>
        <Input
          label='To Address'
          placeholder='Enter To Address'
          name='addressTo'
          type='text'
          value={formData.addressTo}
          disabled={disabled}
          onChange={onChange}
        />
        <Input
          label={`Amount (${symbol})`}
          placeholder='Enter Amount'
          name='amount'
          type='number'
          step={amountStep}
          value={formData.amount}
          onChange={onChange}
          disabled={disabled}
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
      {errorMessage && (
        <>
          <div className='mt-2 h-[1px] w-full bg-gray-400' />
          <div className='mt-2 flex w-full border-[2px] border-red-600 p-2'>{errorMessage}</div>
        </>
      )}
    </Fragment>
  );
};

export default TransactionForm;

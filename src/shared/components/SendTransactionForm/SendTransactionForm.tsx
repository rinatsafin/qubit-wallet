import { Input, Loader } from '@/shared/components';
import { FC, InputHTMLAttributes } from 'react';

interface SendTransactionFormProps {
  onSubmit: () => void;
  isLoading: boolean;
  onChange: InputHTMLAttributes<HTMLInputElement>['onChange'];
}

const SendTransactionForm: FC<SendTransactionFormProps> = ({ onSubmit, onChange, isLoading }) => {
  return (
    <div className='blue-glassmorphism mt-6 flex w-full flex-col items-center justify-start rounded-2xl p-5 sm:w-96'>
      <form onSubmit={onSubmit}>
        {/* <Dropdown defaultOption={{}} /> */}
        <Input
          label='To Address'
          placeholder='Enter To Address'
          name='addressTo'
          type='text'
          onChange={onChange}
        />
        <Input
          label='Amount'
          placeholder='Enter Amount'
          name='amount'
          type='text'
          onChange={onChange}
        />
        <div className='h-[1px] w-full bg-gray-400' />
        {isLoading ? (
          <Loader />
        ) : (
          <button
            className='mt-2 flex w-full justify-center rounded-full border-[1px] border-[#3d4f7c] p-2'
            type='submit'
          >
            Send token
          </button>
        )}
      </form>
    </div>
  );
};

export default SendTransactionForm;

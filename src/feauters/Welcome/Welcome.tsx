import { CryptoCard, NetworkSwitcher } from '@/feauters';
import { Button, Loader } from '@/shared/components';
import clsx from 'clsx';
import { InputHTMLAttributes, type FC } from 'react';
import { LaunchApp } from '../LaunchApp';
import UserProfile from '../UserProfile/UserProfile';

// <SiBinance fontSize={21} color='#fff' />;
const commonStyles =
  'min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

const Input: FC<InputProps> = ({ placeholder, className, name, label, ...rest }) => (
  <div className='input-wrapper my-2 flex w-full items-center justify-around'>
    <label htmlFor={name} className='w-1/3'>
      {label}
    </label>
    <input
      id={name}
      placeholder={placeholder}
      className={clsx(
        'white-glassmorphism ml-2 w-2/3 flex-auto rounded-sm border-none bg-transparent p-2 text-sm outline-none',
        className,
      )}
      step='0.0001'
      {...rest}
    />
  </div>
);
const isLoading = false;

const Welcome: FC = () => {
  return (
    <div className='flex w-full items-center justify-center text-white'>
      <div className='flex flex-col items-start justify-between px-4 py-12 md:p-20 mf:flex-row'>
        <div className='flex flex-1 flex-col justify-start mf:mr-10'>
          <h1 className='text-gradient py-1 text-3xl sm:text-5xl'>
            Send Crypto <br />
            <span className='sm:text-4xl'>around the world</span>
          </h1>
          <p className='mt-5 w-11/12 text-left text-base font-light md:w-9/12'>
            Qubit wallet allows to easily send crypto.
            <br />
            Buy and sell cryptocurrencies easily.
          </p>
          <LaunchApp size='custom' className='mt-4 px-8 py-4 text-4xl' isHiddenAfterLogin />
          <UserProfile />
          {
            // TODO: Move into compoment
          }
          <div className='mt-4 grid grid-cols-2 sm:grid-cols-3'>
            <div className={clsx('rounded-tl-2xl', commonStyles)}>Reliability</div>
            <div className={commonStyles}>Security</div>
            <div className={clsx('rounded-tr-2xl', commonStyles)}>Etherium</div>
            <div className={clsx('rounded-bl-2xl', commonStyles)}>Web 3.0</div>
            <div className={commonStyles}>Low fees</div>
            <div className={clsx('rounded-br-2xl', commonStyles)}>Block chains</div>
          </div>
        </div>
        {
          // TODO: Move into EtherCard component
        }
        <div className='mt-10 flex w-full flex-1 flex-col items-center justify-start mf:mt-0'>
          <NetworkSwitcher />
          <CryptoCard />
          {
            // TODO: FORM
          }
          <div className='blue-glassmorphism mt-6 flex w-full flex-col items-center justify-start rounded-2xl p-5 sm:w-96'>
            <Input
              label='Address To'
              placeholder='Enter Address To'
              name='addressTo'
              type='text'
              onChange={() => {}}
            />
            <Input
              label='Amount (ETH)'
              placeholder='Enter Amount ETH'
              name='amount'
              type='text'
              onChange={() => {}}
            />
            <Input
              label='Keywords'
              placeholder='Enter Keywords(Gif)'
              name='keyword'
              type='text'
              onChange={() => {}}
            />
            <Input
              label='Message'
              placeholder='Enter Message'
              name='message'
              type='text'
              onChange={() => {}}
            />
            <div className='h-[1px] w-full bg-gray-400' />
            {isLoading ? (
              <Loader />
            ) : (
              <Button className='mt-2 flex w-full justify-center rounded-full border-[1px] border-[#3d4f7c] p-2'>
                Send token
              </Button>
            )}
          </div>
        </div>
        {
          // END EtherCard & Form
        }
      </div>
    </div>
  );
};

export default Welcome;

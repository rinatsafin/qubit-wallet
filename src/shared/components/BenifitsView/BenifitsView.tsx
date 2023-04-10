import clsx from 'clsx';
import type { FC } from 'react';

const commonStyles =
  'min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white';

// TODO: Move elements to array and map them
const BenifitsView: FC = () => {
  return (
    <div className='mt-4 grid grid-cols-2 sm:grid-cols-3'>
      <div className={clsx('rounded-tl-2xl', commonStyles)}>Reliability</div>
      <div className={commonStyles}>Security</div>
      <div className={clsx('rounded-tr-2xl', commonStyles)}>Etherium</div>
      <div className={clsx('rounded-bl-2xl', commonStyles)}>Web 3.0</div>
      <div className={commonStyles}>Low fees</div>
      <div className={clsx('rounded-br-2xl', commonStyles)}>Block chains</div>
    </div>
  );
};

export default BenifitsView;

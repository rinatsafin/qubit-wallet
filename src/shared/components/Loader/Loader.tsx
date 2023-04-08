import { type FC } from 'react';

const Loader: FC = () => {
  return (
    <div className='flex items-center justify-center py-3 '>
      <div className='h-32 w-32 animate-spin rounded-full border-b-2 border-indigo-500' />
    </div>
  );
};

export default Loader;

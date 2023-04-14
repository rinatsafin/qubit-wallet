import { type INews } from '@/shared/types';
import { type FC } from 'react';
import { ArrowIcon } from '../icons';

const NewsView: FC<{ item: INews }> = ({ item }) => {
  return (
    <div className='max-w-sm rounded-xl border border-gray-200 bg-white p-3 shadow dark:border-gray-700 dark:bg-gray-800'>
      <h5 className='mb-2 text-xl tracking-tight text-gray-900 dark:text-white'>{item.title}</h5>
      <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
        {item.kind} {new Date(item.created_at).toLocaleString()}
      </p>
      <div className='flex justify-between'>
        <p>News by {item.source.title}</p>
        <p className='text-sm text-gray-300'>region {item.source.region}</p>
      </div>
      <a
        href={item.url}
        target='_blank'
        referrerPolicy='no-referrer'
        rel='noopener'
        className='inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
      >
        Read more
        <ArrowIcon />
      </a>
    </div>
  );
};

export default NewsView;

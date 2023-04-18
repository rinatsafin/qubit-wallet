import clsx from 'clsx';
import Link from 'next/link';
import { type FC } from 'react';

type NavbarItemProps = {
  title: string;
  className?: string;
  path: string;
  pathname: string | null;
};

const NavbarItem: FC<NavbarItemProps> = ({ className, title, path, pathname }) => {
  const isActive = path === pathname;

  return (
    <li
      className={clsx(
        'cursor-pointer rounded-xl hover:bg-[#9951f069] hover:text-white md:text-gray-300',
        className,
      )}
    >
      {path === '/' || path === '/news' ? (
        <>
          <Link href={path} className='block w-full px-3 py-2'>
            {title}
          </Link>
          <div className='px-2'>
            <div className={clsx('h-[1px] w-full', isActive && 'bg-gray-400')} />
          </div>
        </>
      ) : (
        <div className='px-3 py-2'>{title}</div>
      )}
    </li>
  );
};

export default NavbarItem;

import clsx from 'clsx';
import Link from 'next/link';
import { type FC } from 'react';

type NavbarItemProps = {
  title: string;
  className?: string;
  path: string;
  pathname: string;
};

const NavbarItem: FC<NavbarItemProps> = ({ className, title, path, pathname }) => {
  const isActive = path === pathname;

  return (
    <li
      className={clsx(
        'cursor-pointer rounded-xl px-3 py-2 hover:bg-[#9951f069] hover:text-white md:text-gray-300',
        className,
      )}
    >
      {path === '/' || path === '/news' ? <Link href={path}>{title}</Link> : title}
      <div className={clsx('h-[1px] w-full', isActive && 'bg-gray-400')} />
    </li>
  );
};

export default NavbarItem;

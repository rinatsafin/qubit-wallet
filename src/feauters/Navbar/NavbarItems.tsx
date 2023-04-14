import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { type FC } from 'react';
import NavbarItem from './NavbarItem';
import { navList } from './const';

type NavbarItemsProps = {
  className?: string;
};

const NavbarItems: FC<NavbarItemsProps> = ({ className }) => {
  const pathname = usePathname();
  return (
    <ul
      className={clsx(
        'mx-3 flex-initial list-none flex-row items-center justify-between',
        className,
      )}
    >
      {navList.map((item) => (
        <NavbarItem title={item.title} key={item.id} path={item.path} pathname={pathname} />
      ))}
    </ul>
  );
};

export default NavbarItems;

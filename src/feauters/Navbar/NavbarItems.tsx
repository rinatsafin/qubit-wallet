import clsx from 'clsx';
import { type FC } from 'react';
import NavbarItem from './NavbarItem';
import { navList } from './const';

const list = navList.map((item) => <NavbarItem title={item.title} key={item.id} />);

type NavbarItemsProps = {
  className?: string;
};

const NavbarItems: FC<NavbarItemsProps> = ({ className }) => (
  <ul className={clsx('flex-initial list-none flex-row items-center justify-between', className)}>
    {list}
  </ul>
);

export default NavbarItems;

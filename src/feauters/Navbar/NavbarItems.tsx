import clsx from 'clsx';
import { type FC } from 'react';
import NavbarItem from './NavbarItem';
import { navList } from './const';

const list = navList.map((item) => <NavbarItem title={item.title} key={item.id} />);

type NavbarItemsProps = {
  classProps?: string;
};

const NavbarItems: FC<NavbarItemsProps> = ({ classProps }) => (
  <ul className={clsx('flex-initial list-none flex-row items-center justify-between', classProps)}>
    {list}
  </ul>
);

export default NavbarItems;

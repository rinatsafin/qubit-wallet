import clsx from 'clsx';
import { type FC } from 'react';

type NavbarItemProps = {
  title: string;
  classProps?: string;
};

const NavbarItem: FC<NavbarItemProps> = ({ classProps, title }) => {
  return <li className={clsx('mx-4 cursor-pointer', classProps)}>{title}</li>;
};

export default NavbarItem;

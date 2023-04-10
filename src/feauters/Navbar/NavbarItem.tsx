import clsx from 'clsx';
import { type FC } from 'react';

type NavbarItemProps = {
  title: string;
  classProps?: string;
};

const NavbarItem: FC<NavbarItemProps> = ({ classProps, title }) => {
  return (
    <li className={clsx('mx-4 cursor-pointer rounded-full p-3 hover:bg-[#9951f069]', classProps)}>
      {title}
    </li>
  );
};

export default NavbarItem;

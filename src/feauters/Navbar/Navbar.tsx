import { LaunchApp } from '@/feauters';
import { Logo, Sidebar } from '@/shared/components';
import { useState, type FC } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { HiMenuAlt4 } from 'react-icons/hi';
import NavbarItems from './NavbarItems';

const Navbar: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const MenuIcon = isMenuOpen ? AiOutlineClose : HiMenuAlt4;
  const onMenuClose = () => setIsMenuOpen(false);

  return (
    <nav className='flex w-full items-center justify-between px-4 py-2 md:justify-center'>
      <Logo />
      <div className='flex'>
        <NavbarItems classProps='hidden md:flex text-white' />
        <LaunchApp />
        <MenuIcon
          fontSize={28}
          className='ml-6 cursor-pointer text-white md:hidden'
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
        <Sidebar
          isSidebarOpen={isMenuOpen}
          onCloseClick={onMenuClose}
          className='flex items-center pt-6'
          isHiddenOnMobile
        >
          <NavbarItems classProps='text-xl' />
        </Sidebar>
      </div>
    </nav>
  );
};

export default Navbar;

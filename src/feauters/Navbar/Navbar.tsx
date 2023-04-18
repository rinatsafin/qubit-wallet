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
    <nav className='m-auto flex max-w-screen-xl items-center justify-between px-4 py-2 md:justify-center'>
      <Logo />
      <div className='flex'>
        <NavbarItems className='hidden text-white md:flex' />
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
          <NavbarItems className='w-full p-2 text-xl font-semibold' />
        </Sidebar>
      </div>
    </nav>
  );
};

export default Navbar;

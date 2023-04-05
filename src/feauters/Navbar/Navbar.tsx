import { LaunchApp } from '@/feauters/LaunchApp';
import { Logo, Sidebar } from '@/shared/components';
import { useIsMounted } from '@/shared/hooks';
import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { HiMenuAlt4 } from 'react-icons/hi';
import NavbarItems from './NavbarItems';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const isMounted = useIsMounted();
  const MenuIcon = isMenuOpen ? AiOutlineClose : HiMenuAlt4;
  const onMenuClose = () => setIsMenuOpen(false);
  return (
    <nav className='flex w-full items-center justify-between md:justify-center'>
      <Logo />
      <NavbarItems classProps='hidden md:flex text-white' />
      <div className='flex'>
        <MenuIcon
          fontSize={28}
          className='cursor-pointer text-white md:hidden'
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
        <Sidebar
          isSidebarOpen={isMenuOpen}
          onCloseClick={onMenuClose}
          classProps='flex items-center pt-6'
          isHiddenOnMobile
        >
          <NavbarItems classProps='text-xl' />
        </Sidebar>
      </div>
      {isMounted && <LaunchApp />}
    </nav>
  );
};

export default Navbar;

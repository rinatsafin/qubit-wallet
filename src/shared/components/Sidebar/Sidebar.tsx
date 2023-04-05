import clsx from 'clsx';
import { type DetailedHTMLProps, type FC, type HTMLAttributes } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { Button } from '../Button';

type SidebarProps = {
  isSidebarOpen: boolean;
  onCloseClick: () => void;
  classProps?: string;
  isHiddenOnMobile?: boolean;
};

const Sidebar: FC<
  SidebarProps & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = ({ isSidebarOpen, isHiddenOnMobile, classProps, onCloseClick, children }) => {
  return (
    <>
      <Button
        className={clsx(
          'sidebar-mask blue-glassmorphism animate-slide-in absolute inset-0 duration-300 ease-in-out',
          isSidebarOpen ? 'visible' : 'hidden',
          isHiddenOnMobile && 'md:hidden',
        )}
        onClick={onCloseClick}
        role='button'
      />
      <div
        className={clsx(
          'max:w-full animate-slide-in fixed top-2 flex h-[calc(100vh-1rem)] w-72 flex-col items-start rounded-xl bg-white p-4 text-black shadow-2xl duration-300 ease-in-out lg:w-80',
          isHiddenOnMobile && 'md:hidden',
          isSidebarOpen ? 'visible right-2 translate-x-0' : '-right-2 translate-x-full',
          classProps,
        )}
      >
        <Button className='fixed right-2 top-2' onClick={onCloseClick}>
          <AiOutlineClose />
        </Button>
        {children}
      </div>
    </>
  );
};

export default Sidebar;

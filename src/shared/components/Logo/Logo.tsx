// https://cdn-icons-png.flaticon.com/512/1998/1998711.png
import Link from 'next/link';
import logo from '/public/assets/images/qubit_logo.png';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const Logo = () => {
  const pathName = usePathname();
  const isHome = pathName === '/';
  return (
    <div className='flex-initial md:flex-[0.5]'>
      <div className='flex items-center justify-center'>
        {isHome ? (
          <div className='flex items-center justify-center'>
            <Image className='w-16 lg:w-24' src={logo} alt='qubit wallet logo' priority />
            <span className='pl-2 text-sm font-extrabold text-gray-300 lg:text-xl'>
              Qubit Wallet
            </span>
          </div>
        ) : (
          <Link href='/' className='flex items-center justify-center'>
            <Image
              className='w-16 cursor-pointer lg:w-24'
              src={logo}
              alt='qubit wallet logo'
              priority
            />
            <span className='cursor-pointer pl-2 text-sm font-extrabold text-gray-300 lg:text-xl'>
              Qubit Wallet
            </span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Logo;

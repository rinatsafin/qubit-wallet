// https://cdn-icons-png.flaticon.com/512/1998/1998711.png
import logo from '@/shared/images/qubit-logo.png';
import Image from 'next/image';

const Logo = () => (
  <div className='flex-initial md:flex-[0.5]'>
    <div className='flex items-center justify-center'>
      <Image className='md:w-22 w-16 cursor-pointer lg:w-24' src={logo} alt='qubit wallet logo' />
      <h2 className='cursor-pointer text-sm  font-extrabold text-gray-300 md:text-lg lg:text-xl'>
        Qubit Wallet
      </h2>
    </div>
  </div>
);

export default Logo;

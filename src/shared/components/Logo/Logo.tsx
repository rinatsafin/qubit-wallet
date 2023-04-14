// https://cdn-icons-png.flaticon.com/512/1998/1998711.png
import logo from '/public/assets/images/qubit_logo.png';
import Image from 'next/image';

const Logo = () => (
  <div className='flex-initial md:flex-[0.5]'>
    <div className='flex items-center justify-center'>
      <Image className='w-16 cursor-pointer lg:w-24' src={logo} alt='qubit wallet logo' priority />
      <h2 className='cursor-pointer text-sm  font-extrabold text-gray-300 lg:text-xl'>
        Qubit Wallet
      </h2>
    </div>
  </div>
);

export default Logo;

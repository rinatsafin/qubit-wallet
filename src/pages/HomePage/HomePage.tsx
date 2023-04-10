import { type FC } from 'react';
import { CryptoCards, NetworkSwitcher, Transaction, LaunchApp, UserProfile } from '@/feauters';
import { BenifitsView, QubitIntroView } from '@/shared/components';

const HomePage: FC = () => {
  return (
    <main>
      <div className='main relative min-h-screen text-white bg-blend-darken'>
        <div className='flex w-full items-center justify-center text-white'>
          <div className='flex flex-col items-start justify-between px-4 py-12 md:p-20 mf:flex-row'>
            <div className='flex flex-1 flex-col justify-start mf:mr-10'>
              <QubitIntroView />
              <LaunchApp size='custom' className='mt-4 px-8 py-4 text-4xl' isHiddenAfterConnect />
              <UserProfile />
              <BenifitsView />
            </div>
            <div className='mt-10 flex w-full flex-1 flex-col items-center justify-start mf:mt-0'>
              <NetworkSwitcher />
              <CryptoCards />
              <Transaction />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;

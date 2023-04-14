'use client';

import { CryptoCards, LaunchApp, NetworkSwitcher, Transaction, UserProfile } from '@/feauters';
import { BenifitsView, QubitIntroView } from '@/shared';

export default function Home() {
  return (
    <div className='flex flex-col items-start justify-between px-4 py-12 text-white md:p-20 mf:flex-row'>
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
  );
}

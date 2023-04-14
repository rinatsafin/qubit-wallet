'use client';

import { Navbar } from '@/feauters';
import { WagmiProvider, ErrorBoundary } from '@/providers/';
import { type ReactNode } from 'react';
import ClientOnly from './clientOnly';

const RootProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ErrorBoundary>
      <WagmiProvider>
        <ClientOnly>
          <div className='app gradient-bg-home relative min-w-[23.4375rem]'>
            <Navbar />
            <main>
              <div className='main relative min-h-screen bg-blend-darken'>
                <div className='flex w-full items-center justify-center'>{children}</div>
              </div>
            </main>
          </div>
        </ClientOnly>
      </WagmiProvider>
    </ErrorBoundary>
  );
};

export default RootProvider;

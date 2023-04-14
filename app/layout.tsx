import '@/shared/styles/globals.css';

import { type ReactNode } from 'react';
import { Open_Sans } from 'next/font/google';
import RootProvider from './RootProvider';

const openSans = Open_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata = {
  title: 'Qubit wallet dApp',
  description: 'Send crypto arround the world',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <body className={`${openSans.variable} font-sans`}>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}

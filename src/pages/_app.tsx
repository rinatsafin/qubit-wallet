import { client } from '@/shared/config';
import '@/shared/styles/globals.css';
import type { AppProps } from 'next/app';
import { WagmiConfig } from 'wagmi';
import { ErrorBoundary } from './providers/ErrorBoundary';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ErrorBoundary>
      <WagmiConfig client={client}>
        <Component {...pageProps} />
      </WagmiConfig>
    </ErrorBoundary>
  );
};
export default App;

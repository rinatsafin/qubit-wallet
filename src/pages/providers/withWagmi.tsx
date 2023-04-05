import { type ReactElement } from 'react';
import { WagmiConfig } from 'wagmi';
import { client } from './wagmi';

const withWagmi = (component: () => ReactElement) => () =>
  <WagmiConfig client={client}>{component()}</WagmiConfig>;

export default withWagmi;

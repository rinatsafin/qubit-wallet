import { client } from '@/shared';
import { WagmiConfig } from 'wagmi';

const WagmiProvider = ({ children }: { children: React.ReactNode }) => {
  return <WagmiConfig client={client}>{children}</WagmiConfig>;
};

export default WagmiProvider;

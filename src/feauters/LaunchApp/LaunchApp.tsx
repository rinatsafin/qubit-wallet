import { Button, LaunchAppButton, Sidebar } from '@/shared/components';
import { Size } from '@/shared/types';
import { useState, type FC } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

interface LaunchAppProps {
  size?: Size;
  className?: string;
  isHiddenAfterConnect?: boolean;
}

const LaunchApp: FC<LaunchAppProps> = ({ size, className, isHiddenAfterConnect }) => {
  const { isConnected, connector } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect();
  const { disconnect } = useDisconnect();
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  if (isHiddenAfterConnect && isConnected) return null;
  return (
    <>
      <LaunchAppButton
        size={size}
        className={className}
        isConnected={isConnected}
        onClick={() => (!isConnected ? setIsSidebarOpen(true) : disconnect())}
      />
      <Sidebar isSidebarOpen={isSidebarOpen} onCloseClick={() => setIsSidebarOpen(false)}>
        <>
          <h3 className='mt-6 text-2xl font-semibold'>Connect a wallet</h3>
          <div className='mt-2 flex w-full flex-col'>
            {connectors
              ?.filter((x) => x.ready && x.id !== connector?.id)
              .map((c) => (
                <Button
                  className='mt-2 rounded-xl border-2 p-3 hover:bg-[#e3e3e3]'
                  key={c.id}
                  onClick={() => {
                    connect({ connector: c });
                    setIsSidebarOpen(false);
                  }}
                >
                  {c.name.includes('Legacy') ? c.name.replace('Legacy', '') : c.name}
                  {isLoading && c.id === pendingConnector?.id && ' (connecting)'}
                </Button>
              ))}
          </div>
          {error && <div className='mt-4 text-rose-500'>{error.message}</div>}
        </>
      </Sidebar>
    </>
  );
};

export default LaunchApp;

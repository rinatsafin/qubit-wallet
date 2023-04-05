import { Button, LaunchAppButton, Sidebar } from '@/shared/components';
import { useState } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

const LaunchApp = () => {
  // const { connector, isConnected } = useAccount();
  // const { connect, connectors, error, isLoading, pendingConnector } = useConnect();
  // const { disconnect } = useDisconnect();

  // return (
  //   <div>
  //     <div>
  //       {isConnected && (
  //         <button onClick={() => disconnect()}>Disconnect from {connector?.name}</button>
  //       )}

  //       {connectors
  //         ?.filter((x) => x.ready && x.id !== connector?.id)
  //         .map((x) => (
  //           <button key={x.id} onClick={() => connect({ connector: x })}>
  //             {x.name}
  //             {isLoading && x.id === pendingConnector?.id && ' (connecting)'}
  //           </button>
  //         ))}
  //     </div>

  //     {error && <div>{error.message}</div>}
  //   </div>
  // );
  const { isConnected, connector } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect();
  const { disconnect } = useDisconnect();
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  // useEffect(() => {
  //   const onToggleSidebar = (event: Event) => {
  //     const target = event.target as Element;
  //     const { className } = target;
  //     const isClipMediaTarget =
  //       typeof className === 'string' && className.includes();
  //     setIsSidebarOpen((prev) => !prev);
  //   };
  //   document.addEventListener('click', onToggleSidebar);
  //   return () => {
  //     document.removeEventListener('click', onToggleSidebar);
  //   };
  // }, []);

  return (
    <>
      <LaunchAppButton
        isConnected={isConnected}
        onClick={() => (!isConnected ? setIsSidebarOpen(true) : disconnect())}
      />
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        onCloseClick={() => setIsSidebarOpen(false)}
        classProps='rounded-xl'
      >
        <>
          <h3 className='mt-6 text-2xl font-semibold'>Connect a wallet</h3>
          {connectors
            ?.filter((x) => x.ready && x.id !== connector?.id)
            .map((c) => (
              <Button
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
          {error && <div className='mt-4 text-gray-400'>{error.message}</div>}
        </>
      </Sidebar>
    </>
  );
};

export default LaunchApp;

import { useIsMounted } from '@/shared/hooks';
import { getEllipsisText } from '@/shared/utils';
import { useAccount } from 'wagmi';

const UserProfile = () => {
  const isMounted = useIsMounted();
  const { address, connector, isConnected } = useAccount();
  // TODO: Not supported by BNB test networks
  // const { data: ensAvatar } = useEnsAvatar({ address });
  // const { data: ensName } = useEnsName({ address });
  const parsedAddress = address ? getEllipsisText(address) : '';
  if (!isMounted || !isConnected || !connector) return null;
  return (
    <div className='mt-5'>
      <h3 className='py-1 text-xl sm:text-3xl'>Wellcome to Qubit Wallet!</h3>
      <div className='mt-1'>Your address {parsedAddress}</div>
      {/* {ensAvatar && <Image src={ensAvatar} alt='ENS Avatar' />} */}
      <div className='mt-1'>Connected to {connector.name}.</div>
    </div>
  );
};

export default UserProfile;

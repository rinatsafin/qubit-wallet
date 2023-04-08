import { useIsMounted } from '@/shared/hooks';
import { EChain } from '@/shared/types';
import { getEllipsisText } from '@/shared/utils';
import { BsInfoCircle } from 'react-icons/bs';
import { SiBinance, SiEthereum } from 'react-icons/si';
import { Chain, useAccount, useNetwork } from 'wagmi';
import { Balance } from '../Balance';

const DEFAULT_CONNECTOR = EChain.GOERLI;
const getCurrencyIconByChainId = (chainId: Chain['id'] = DEFAULT_CONNECTOR) => {
  switch (chainId) {
    case EChain.BINANCE:
    case EChain.BINANCE_TEST_NET: {
      return <SiBinance fontSize={21} />;
    }
    case EChain.ETHEREUM:
    case EChain.GOERLI:
    default: {
      return <SiEthereum fontSize={21} />;
    }
  }
};

const CryptoCard = () => {
  const isMounted = useIsMounted();
  const { chain } = useNetwork();
  const {
    address,
    // connector
  } = useAccount();
  // const selectedChain: Chain =
  //   connector?.chains.find((chain) => chain.id === DEFAULT_CONNECTOR) || ({} as Chain);
  if (!isMounted || !chain) return null;
  const { id }: Chain = chain;
  return (
    <div className='crypto-card white-glassmorphism mt-6 h-40 w-full flex-col items-start justify-end rounded-xl p-3 sm:w-72'>
      <div className='flex h-full w-full flex-col justify-between'>
        <div className='flex items-start justify-between'>
          <div className='flex h-10 w-10 items-center justify-center rounded-full border-2'>
            {getCurrencyIconByChainId(id)}
          </div>
          <BsInfoCircle fontSize={21} />
        </div>
        <div>
          <div className='flex items-start justify-start text-sm'>
            <p>Address</p>
            <p className='ml-1 font-light'>{address && getEllipsisText(address)}</p>
          </div>
          <Balance chain={chain} address={address} />
        </div>
      </div>
    </div>
  );
};

export default CryptoCard;

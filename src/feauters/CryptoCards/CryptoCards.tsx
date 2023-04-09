import { type FC } from 'react';
import { useIsMounted } from '@/shared/hooks';
import { useAccount, useNetwork } from 'wagmi';
// import { EChain } from '@/shared/types';
import { checkIsSupportedContractByChain } from '@/shared/utils/crypto';
import { SUPPORTED_CONTRACTS_BY_CHAIN_ID } from '@/shared/const';
import CryptoCard from './CryptoCard';

const CryptoCards: FC = () => {
  const isMounted = useIsMounted();
  const { chain } = useNetwork();
  const { address } = useAccount();
  if (!isMounted || !chain) return null;
  // TODO: This part should be redesigned for production.
  // We need to implement the ability to get tokens from user input.
  const isContractCurrency = checkIsSupportedContractByChain(chain);

  return (
    <div className='crypto-cards'>
      <CryptoCard address={address} chain={chain} />
      {isContractCurrency && (
        <CryptoCard
          address={address}
          chain={chain}
          token={SUPPORTED_CONTRACTS_BY_CHAIN_ID[chain.id]}
        />
      )}
    </div>
  );
};

export default CryptoCards;

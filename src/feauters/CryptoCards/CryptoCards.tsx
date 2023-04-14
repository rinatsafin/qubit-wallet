import { type FC } from 'react';
import { useAccount, useNetwork } from 'wagmi';
import { checkIsSupportedContractByChain } from '@/shared/utils/crypto';
import { SUPPORTED_CONTRACT_ADDRESS_BY_CHAIN_ID } from '@/shared/const';
import CryptoCard from './CryptoCard';

const CryptoCards: FC = () => {
  const { chain } = useNetwork();
  const { address } = useAccount();
  // TODO: This part should be redesigned for production.
  // We need to implement the ability to get tokens from user input.
  const isContractCurrency = checkIsSupportedContractByChain(chain);

  return (
    <div className='crypto-cards w-full'>
      <CryptoCard address={address} chain={chain} />
      {isContractCurrency && chain && (
        <CryptoCard
          address={address}
          chain={chain}
          token={SUPPORTED_CONTRACT_ADDRESS_BY_CHAIN_ID[chain.id]}
        />
      )}
    </div>
  );
};

export default CryptoCards;

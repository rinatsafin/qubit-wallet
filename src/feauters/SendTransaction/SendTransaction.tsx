import { SUPPORTED_CONTRACT_ADDRESS_BY_CHAIN_ID } from '@/shared/const';
import { useIsMounted } from '@/shared/hooks';
import { checkIsSupportedContractByChain } from '@/shared/utils';
import { useNetwork, useAccount } from 'wagmi';
import SendTransactionContractCurrency from './SendTransactionContractCurrency';
import SendTransactionNativeCurrency from './SendTransactionNativeCurrency';

const amountStep = '0.0001';

const SendTransaction = () => {
  const isMounted = useIsMounted();
  const { chain } = useNetwork();
  const { address } = useAccount();
  const isContractCurrency = checkIsSupportedContractByChain(chain);
  const token =
    isContractCurrency && chain?.id ? SUPPORTED_CONTRACT_ADDRESS_BY_CHAIN_ID[chain?.id] : undefined;

  if (!isMounted || !address || !chain) return null;
  // TODO: ADD dropdown for selecting token
  // TODO: Refactor this components: SendTransactionContractCurrency, SendTransactionNativeCurrency
  return (
    <div className='blue-glassmorphism mt-6 flex w-full flex-col items-center justify-start rounded-2xl p-4 sm:w-96'>
      <h2 className='text-2xl font-bold'>Send Transaction</h2>
      <div className='h-[1px] w-full bg-gray-400' />
      {isContractCurrency && token ? (
        <SendTransactionContractCurrency
          token={token}
          address={address}
          amountStep={amountStep}
          chain={chain}
        />
      ) : (
        <SendTransactionNativeCurrency address={address} amountStep={amountStep} chain={chain} />
      )}
    </div>
  );
};

export default SendTransaction;

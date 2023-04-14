import { SUPPORTED_CONTRACT_ADDRESS_BY_CHAIN_ID } from '@/shared/const';
import { checkIsSupportedContractByChain, getCurrenciesOptionsByChain } from '@/shared/utils';
import { useNetwork, useAccount } from 'wagmi';
import { useEffect, useState } from 'react';
import { CurrencySelect } from '@/shared/components';
import TransactionContractCurrency from './TransactionContractCurrency';
import TransactionNativeCurrency from './TransactionNativeCurrency';

const amountStep = '0.0001';

const Transaction = () => {
  const { chain } = useNetwork();
  const { address } = useAccount();
  const isContractCurrency = checkIsSupportedContractByChain(chain);
  const [selectedCurrency, setSelectedCurrency] = useState<null | string>(null);
  const token = isContractCurrency && chain && SUPPORTED_CONTRACT_ADDRESS_BY_CHAIN_ID[chain.id];
  const onCurrencyChange = (currency: string) => {
    setSelectedCurrency(currency);
  };

  useEffect(() => {
    if (chain?.nativeCurrency.symbol) setSelectedCurrency(chain?.nativeCurrency.symbol);
  }, [chain?.nativeCurrency.symbol]);

  return (
    <div className='blue-glassmorphism mt-6 flex w-full flex-col items-center justify-start rounded-2xl p-4 sm:w-96'>
      <h2 className='text-2xl font-bold'>Send Transaction</h2>
      <div className='h-[1px] w-full bg-gray-400' />
      {isContractCurrency && token && address ? (
        <>
          <CurrencySelect
            currencies={getCurrenciesOptionsByChain(chain)}
            onChange={onCurrencyChange}
            defaultValue={chain.nativeCurrency.symbol}
          />
          {selectedCurrency === chain.nativeCurrency.symbol ? (
            <TransactionNativeCurrency address={address} amountStep={amountStep} chain={chain} />
          ) : (
            <TransactionContractCurrency
              token={token}
              address={address}
              amountStep={amountStep}
              chain={chain}
            />
          )}
        </>
      ) : (
        <TransactionNativeCurrency address={address} amountStep={amountStep} chain={chain} />
      )}
    </div>
  );
};

export default Transaction;

import type { ChangeEvent, FC } from 'react';

interface CurrencySelectProps {
  currencies: { symbol: string }[];
  defaultValue: string;
  onChange: (selectedCurrency: string) => void;
}

const CurrencySelect: FC<CurrencySelectProps> = ({ currencies, onChange, defaultValue }) => {
  const handleCurrencyChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };
  return (
    <div className='my-2 flex w-full items-center justify-around'>
      <h3 className='w-8/12'>Select Currency</h3>
      <select
        onChange={handleCurrencyChange}
        className='w-4/12 rounded-full border-emerald-50 px-6 py-2 text-black'
        defaultValue={defaultValue}
      >
        {currencies.map((currency) => (
          <option key={currency.symbol} value={currency.symbol}>
            {currency.symbol}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencySelect;

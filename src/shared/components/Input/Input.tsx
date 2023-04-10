import type { InputHTMLAttributes, FC } from 'react';
import clsx from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input: FC<InputProps> = ({
  placeholder,
  className,
  name,
  label,
  onChange,
  step,
  type,
  value,
  ...rest
}) => (
  <div className='input-wrapper my-2 flex w-full items-center justify-around'>
    {label && (
      <label htmlFor={name} className='w-1/3'>
        {label}
      </label>
    )}

    <input
      id={name}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      type={type}
      className={clsx(
        'white-glassmorphism ml-2 w-2/3 flex-auto rounded-sm border-none bg-transparent p-2 text-sm outline-none',
        className,
      )}
      step={step}
      value={value}
      {...rest}
    />
  </div>
);

export default Input;

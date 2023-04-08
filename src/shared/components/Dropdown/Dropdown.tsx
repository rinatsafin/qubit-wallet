import { Button } from '@/shared/components';
import clsx from 'clsx';
import { PropsWithChildren, ReactNode, useEffect, useRef, useState } from 'react';
import { ChevronDownIcon } from '../icons';

type Option = {
  title: string | ReactNode | JSX.Element;
  id: number;
  isDisabled?: boolean;
};

type DropdownProps = {
  defaultOption: Option;
  options: Option[];
  onChange: (selectedOption: Option) => void;
  className?: string;
};

function Dropdown({
  defaultOption,
  options,
  onChange,
  className,
}: PropsWithChildren<DropdownProps>) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<Option>(defaultOption);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const toggleDropdown = () => setIsOpen(!isOpen);

  const onOptionClick = (option: Option) => {
    setSelectedOption(option);
    setIsOpen(false);

    if (onChange) {
      onChange(option);
    }
  };

  const onClickOutside = (event: Event) => {
    const target = event.target as Element;
    if (dropdownRef.current && event.target && !dropdownRef.current.contains(target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  useEffect(() => {
    setSelectedOption(defaultOption);
  }, [defaultOption]);

  return (
    <div className={clsx('dropdown-container relative text-black', className)} ref={dropdownRef}>
      <Button
        className={clsx(
          'dropdown-btn flex cursor-pointer rounded-full border-2 border-gray-400 bg-white px-4 py-2 text-neutral-500',
          isOpen && 'is-open',
        )}
        onClick={toggleDropdown}
        tabIndex={0}
        role='button'
      >
        <div className='dropdown-btn-label w-full text-ellipsis text-center'>
          {selectedOption.title || 'Select an option'}
        </div>
        <ChevronDownIcon />
      </Button>
      {isOpen && (
        <ul className='dropdown-list absolute z-[1] mt-2 w-full list-none divide-y divide-slate-200 overflow-hidden rounded-xl border-2 border-gray-400 bg-white'>
          {options.map((option, idx) => (
            <li
              key={option.id}
              className={clsx(
                'dropdown-list-item flex h-10 items-center justify-center hover:bg-gray-200',
                option.isDisabled ? 'cursor-not-allowed' : 'cursor-pointer',
              )}
            >
              <Button
                onClick={() => onOptionClick(option)}
                tabIndex={idx + 1}
                role='button'
                disabled={option.isDisabled}
                className='flex h-full w-full items-center justify-center'
              >
                {option.title}
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;

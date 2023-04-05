import { Button } from '@/shared/components';
import clsx from 'clsx';
import { type FC } from 'react';
import { ButtonProps } from '../Button/Button';

type LaunchAppButtonProps = {
  size?: 'small' | 'medium' | 'large';
  isConnected: boolean;
};

const LaunchAppButton: FC<LaunchAppButtonProps & ButtonProps> = ({
  size = 'medium',
  isConnected,
  onClick,
}) => {
  return (
    <Button
      className={clsx(
        `flex cursor-pointer rounded-full font-medium outline-none hover:scale-105`,
        size === 'small' && 'px-3 py-2',
        size === 'medium' && 'px-6 py-3 text-lg',
        size === 'large' && 'px-12 py-6 text-4xl',
        isConnected
          ? 'bg-gradient-to-r from-rose-500 to-violet-800 text-violet-400'
          : 'bg-gradient-to-tl from-indigo-700 via-purple-500 to-pink-500',
      )}
      onClick={onClick}
    >
      {isConnected ? 'Disconnect' : 'Launch App'}
    </Button>
  );
};

export default LaunchAppButton;

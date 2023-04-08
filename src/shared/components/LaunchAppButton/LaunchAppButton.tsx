import { Button } from '@/shared/components';
import { Size } from '@/shared/types';
import clsx from 'clsx';
import { type FC } from 'react';
import { ButtonProps } from '../Button/Button';

type LaunchAppButtonProps = {
  size?: Size;
  isConnected: boolean;
  className?: string;
};

const LaunchAppButton: FC<LaunchAppButtonProps & ButtonProps> = ({
  size = 'medium',
  isConnected,
  onClick,
  className,
}) => {
  return (
    <Button
      className={clsx(
        `flex cursor-pointer justify-center rounded-xl font-medium text-white outline-none hover:scale-105 md:rounded-full`,
        className,
        size === 'small' && 'px-3 py-2',
        size === 'medium' && 'px-3 py-3 text-lg md:px-6 md:py-2',
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

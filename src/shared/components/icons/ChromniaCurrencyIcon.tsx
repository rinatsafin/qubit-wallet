import clsx from 'clsx';
import { FC } from 'react';
import type { IconBaseProps } from './types';

const ChromniaCurrencyIcon: FC<IconBaseProps> = ({
  fill = '#060606',
  className,
  ...otherProps
}) => {
  return (
    <svg viewBox='0 0 512 512' className={clsx('icon icon-chr', className)} {...otherProps}>
      <circle cx='256' cy='256' r='256' fill={fill} />
      <path
        d='M313.44686,296.225a63.24812,63.24812,0,1,1-.00015-59.07618l65.83819-.00028a125.344,125.344,0,1,0-.12421,59.07618Z'
        fill='#ffb0c2'
      />
      <path
        d='M356.63087,189.86233a62.8849,62.8849,0,1,0-102.60534-48.75267l.00015.04834q1.74893-.04809,3.50943-.04878A124.86234,124.86234,0,0,1,356.63087,189.86233Z'
        fill='#cb8ee9'
      />
      <path
        d='M316.90949,203.99375a62.62315,62.62315,0,0,0,39.72138-14.13142,124.86234,124.86234,0,0,0-99.09576-48.75311q-1.76055,0-3.50943.04878A62.88387,62.88387,0,0,0,316.90949,203.99375Z'
        fill='#cb65b7'
      />
    </svg>
  );
};

export default ChromniaCurrencyIcon;

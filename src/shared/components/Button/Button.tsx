import clsx from 'clsx';
import type {
  AriaAttributes,
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  FC,
  KeyboardEvent,
  MouseEvent,
  TouchEvent,
} from 'react';

export interface ButtonProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    AriaAttributes {
  isDisabled?: boolean;
}

const Button: FC<ButtonProps> = ({
  isDisabled,
  className,
  onClick,
  onKeyDown,
  children,
  tabIndex,
  ...props
}) => {
  const handleClick = (
    event: MouseEvent<HTMLDivElement, globalThis.MouseEvent> | TouchEvent<HTMLDivElement>,
  ) => {
    const mouseEvent = event as MouseEvent<HTMLDivElement>;
    if (!isDisabled && onClick) {
      onClick(mouseEvent);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!isDisabled && onKeyDown) {
      onKeyDown(event);
    }
  };

  return (
    <div
      {...props}
      className={clsx('btn', className, isDisabled && 'cursor-not-allowed disabled:opacity-75')}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={isDisabled ? -1 : tabIndex ?? 0}
      role='button'
    >
      {children}
    </div>
  );
};

export default Button;

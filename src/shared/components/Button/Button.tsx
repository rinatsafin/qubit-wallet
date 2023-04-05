import clsx from 'clsx';
import type {
  AriaAttributes,
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  FC,
  KeyboardEvent,
  MouseEvent,
  // ReactElement,
  TouchEvent,
} from 'react';

export interface ButtonProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    AriaAttributes {
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({
  disabled,
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
    if (!disabled && onClick) {
      onClick(mouseEvent);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!disabled && onKeyDown) {
      onKeyDown(event);
    }
  };

  return (
    <div
      {...props}
      className={clsx('btn', className, disabled && 'cursor-not-allowed disabled:opacity-75')}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={disabled ? -1 : tabIndex ?? 0}
      role='button'
    >
      {children}
    </div>
  );
};

export default Button;

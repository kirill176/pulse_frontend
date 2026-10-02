import classNames from 'classnames';
import { ButtonHTMLAttributes, DetailedHTMLProps, FC, ReactNode } from 'react';
import './Button.css';

export type ButtonProps = {
  children?: ReactNode;
  onClick?: (e: React.SyntheticEvent) => void;
  className?: string;
} & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

const Button: FC<ButtonProps> = ({ children, className, disabled, ...props }) => {
  return (
    <button className={classNames('btn', className)} tabIndex={3} disabled={disabled} {...props}>
      {children}
    </button>
  );
};

export default Button;

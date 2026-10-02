import classNames from 'classnames';
import { ReactNode } from 'react';

interface IFormContainerProps {
  onFormChanged?: () => void;
  onSubmit?: () => void;
  children?: ReactNode;
  className: string;
}

export const FormContainer = ({
  children,
  className,
  onFormChanged,
  onSubmit
}: IFormContainerProps) => {
  return (
    <form
      className={classNames('form-container', className)}
      onChange={onFormChanged}
      onSubmit={onSubmit}
      data-testid='form-element-test-id'
    >
      {children}
    </form>
  );
};

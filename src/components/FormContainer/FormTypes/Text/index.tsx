import classNames from 'classnames';
import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import './Text.css';

interface ITextComponentProps {
  name: string;
  label: string;
  required?: boolean;
}

const Text: FC<ITextComponentProps> = ({ name, required, label }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required }}
      render={({ field }) => (
        <div className={classNames('input-component')}>
          <input className={classNames('input')} id={name} placeholder={label} {...field} />
        </div>
      )}
    />
  );
};

export default Text;

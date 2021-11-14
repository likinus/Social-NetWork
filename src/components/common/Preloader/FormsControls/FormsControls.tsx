import React from 'react';
import { WrappedFieldMetaProps, WrappedFieldProps } from 'redux-form';
import styles from './FormsControls.module.css';

type FormControlPropsType = {
  meta: WrappedFieldMetaProps
}

const FormControl: React.FC<FormControlPropsType> = ({ meta: { touched, error }, children }) => {
  const hasError = touched && error;
  return (
    <div className={styles.formControl + ' ' + (hasError ? styles.error : '')}>
      <div>
        {children}
      </div>
      {hasError ? <span>{error}</span> : null}
    </div>
  );
};

export const TextArea: React.FC<WrappedFieldProps> = (props) => {
  const { input, meta, ...restProps } = props;
  return (
    <FormControl {...props}>
      <textarea {...input} {...restProps} />
    </FormControl>
  );
};

export const Input: React.FC<WrappedFieldProps> = (props) => {
  const { input, meta, ...restProps } = props;
  return (
    <FormControl {...props}>
      <input {...input} {...restProps} />
    </FormControl>
  );
};

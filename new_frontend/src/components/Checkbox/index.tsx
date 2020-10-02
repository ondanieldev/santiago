import React, { InputHTMLAttributes, useEffect, useRef } from 'react';
import { useField } from '@unform/core';
import { FiAlertCircle } from 'react-icons/fi';

import { Container, Error } from './styles';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ name, label, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, error, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'checked',
    });
  }, [fieldName, inputRef, registerField]);

  return (
    <Container>
      <input id={name} name={name} ref={inputRef} type="checkbox" {...rest} />
      <label htmlFor={name}>{label}</label>
      {error && (
        <Error title={error}>
          <FiAlertCircle color="#f44336" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default Checkbox;

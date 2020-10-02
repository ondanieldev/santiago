import React, { SelectHTMLAttributes, useEffect, useRef } from 'react';
import { IconBaseProps } from 'react-icons';
import { useField } from '@unform/core';
import { FiAlertCircle } from 'react-icons/fi';

import { Container, Error } from './styles';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}

const Select: React.FC<SelectProps> = ({
  children,
  name,
  icon: Icon,
  ...rest
}) => {
  const selectRef = useRef<HTMLSelectElement>(null);
  const { fieldName, error, registerField, defaultValue } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'value',
    });
  }, [fieldName, selectRef, registerField]);

  return (
    <Container isErrored={!!error}>
      {Icon && <Icon size={20} />}
      <select defaultValue={defaultValue} name={name} ref={selectRef} {...rest}>
        {children}
      </select>
      {error && (
        <Error title={error}>
          <FiAlertCircle color="#f44336" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default Select;

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';
import ReactInputMask, { Props as InputProps } from 'react-input-mask';

import { Container, InputContainer, Error } from './styles';

interface Props extends InputProps {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
  search?: boolean;
  label?: string;
  maskType: 'cpf' | 'cep' | 'percent';
}

const Input: React.FC<Props> = ({
  name,
  icon: Icon,
  autoComplete = 'off',
  id,
  label,
  maskType,
  ...rest
}) => {
  const inputRef = useRef(null);

  const { fieldName, error, registerField } = useField(name);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [isErrored, setIsErrored] = useState(false);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
    setIsErrored(false);
  }, []);

  const handleBlur = useCallback(e => {
    setIsFocused(false);
    setIsFilled(!!e.target.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      // path: 'value',
      getValue(ref: any) {
        switch (maskType) {
          case 'cpf':
            return ref.value.replace(/[^0-9]+/g, '');
          case 'cep':
            return ref.value.replace(/[^0-9]+/g, '');
          case 'percent':
            return ref.value.replace(/[^0-9]+/g, '');
          default:
            return ref.value;
        }
      },
      setValue(ref: any, value: string) {
        ref.setInputValue(value);
      },
      clearValue(ref: any) {
        ref.setInputValue('');
      },
    });
  }, [fieldName, inputRef, registerField, maskType]);

  useEffect(() => {
    setIsErrored(!!error);
  }, [error]);

  return (
    <Container>
      {label && <label htmlFor={id}>{label}</label>}
      <InputContainer
        isErrored={isErrored}
        isFilled={isFilled}
        isFocused={isFocused}
      >
        {Icon && <Icon size={20} />}
        <ReactInputMask
          autoComplete={autoComplete}
          onFocus={handleFocus}
          onBlur={e => handleBlur(e)}
          name={name}
          ref={inputRef}
          id={id}
          {...rest}
        />
        {isErrored && error && (
          <Error title={error}>
            <FiAlertCircle color="#f44336" size={20} />
          </Error>
        )}
      </InputContainer>
    </Container>
  );
};

export default Input;

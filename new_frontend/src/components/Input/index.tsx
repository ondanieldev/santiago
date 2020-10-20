import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';

import { Container, InputContainer, Error } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
  search?: boolean;
  label?: string;
}

const Input: React.FC<InputProps> = ({
  name,
  icon: Icon,
  autoComplete = 'off',
  id,
  label,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { fieldName, error, registerField } = useField(name);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [isErrored, setIsErrored] = useState(false);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
    setIsErrored(false);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, inputRef, registerField]);

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
        <input
          autoComplete={autoComplete}
          onFocus={handleFocus}
          onBlur={handleBlur}
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

import React, {
  SelectHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { useField } from '@unform/core';
import { FiAlertCircle } from 'react-icons/fi';

import { Container, Error } from './styles';

interface IOption {
  value: string | undefined;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
  optionsArray: IOption[];
}

const Select: React.FC<SelectProps> = ({
  name,
  icon: Icon,
  optionsArray,
  ...rest
}) => {
  const selectRef = useRef<HTMLSelectElement>(null);
  const { fieldName, error, registerField, defaultValue } = useField(name);
  const [selectedOption, setSelectedOption] = useState<string>('');

  useEffect(() => {
    setSelectedOption(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'value',
      setValue(_: HTMLSelectElement, value: string) {
        setSelectedOption(value);
      },
    });
  }, [fieldName, selectRef, registerField]);

  return (
    <Container isErrored={!!error}>
      {Icon && <Icon size={20} />}
      <select
        defaultValue={selectedOption}
        name={name}
        ref={selectRef}
        {...rest}
      >
        {optionsArray.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
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

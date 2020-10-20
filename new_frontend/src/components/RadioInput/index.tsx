import React, { InputHTMLAttributes, useEffect, useRef, useState } from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';

import { Container, RadioGroup, Error } from './styles';

interface IRadioOption {
  id: string;
  label: string;
  value: string;
  default?: boolean;
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  options: IRadioOption[];
  change?(value: string): void;
}

const RadioInput: React.FC<InputProps> = ({ name, label, options, change }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { fieldName, error, registerField } = useField(name);

  const [selectedValue, setSelectedValue] = useState(() => {
    const defaultOption = options.find(option => option.default);
    return defaultOption ? defaultOption.value : '';
  });
  const [defaultValue, setDefaultValue] = useState(() => {
    const defaultOption = options.find(option => option.default);
    return defaultOption ? defaultOption.id : '';
  });
  const [isErrored, setIsErrored] = useState(false);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      setValue(_: HTMLInputElement, value: boolean) {
        setSelectedValue(value ? 'yes' : 'no');
        setDefaultValue(value ? options[0].id : options[1].id);
      },
    });
  }, [fieldName, inputRef, registerField, options]);

  useEffect(() => {
    setIsErrored(!!error);
  }, [error]);

  return (
    <Container>
      <input type="hidden" name={name} ref={inputRef} value={selectedValue} />
      <span>{label}</span>
      <RadioGroup>
        {options.map(option => (
          <div key={option.id}>
            <input
              type="radio"
              id={option.id}
              name={`option-${name}`}
              value={option.value}
              onChange={e => {
                setSelectedValue(e.target.value);
                setDefaultValue(option.id);
                change && change(e.target.value);
              }}
              checked={defaultValue === option.id}
            />
            <label htmlFor={option.id}>{option.label}</label>
          </div>
        ))}
      </RadioGroup>
      {isErrored && error && (
        <Error title={error}>
          <FiAlertCircle color="#f44336" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default RadioInput;

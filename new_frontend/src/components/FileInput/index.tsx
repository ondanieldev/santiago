import React, {
  ChangeEvent,
  useRef,
  useEffect,
  useCallback,
  useState,
} from 'react';
import { useField } from '@unform/core';

import Button from '../Button';
import { Container, InputGroup } from './styles';

interface Props {
  name: string;
  buttonText: string;
  showPreview?: boolean;
}

type InputProps = JSX.IntrinsicElements['input'] & Props;

const FileInputWithPreview: React.FC<InputProps> = ({
  name,
  buttonText,
  defaultValue: inlineDefaultValue,
  showPreview,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { fieldName, registerField, defaultValue } = useField(name);

  const [preview, setPreview] = useState(defaultValue || inlineDefaultValue);
  const [filename, setFilename] = useState('Nenhum arquivo selecionado');

  const handlePreview = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      setPreview(null);
      setFilename('Nenhum arquivo selecionado');
    } else {
      const previewURL = URL.createObjectURL(file);
      setPreview(previewURL);
      setFilename(file.name);
    }
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'files[0]',
      clearValue(ref: HTMLInputElement) {
        ref.value = '';
        setPreview(null);
      },
      setValue(_: HTMLInputElement, value: string) {
        setPreview(value);
        setFilename('');
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      {preview && showPreview && (
        <a href={preview} target="_blank" rel="noopener noreferrer">
          <img src={preview} alt="Preview" height="150" width="150" />
        </a>
      )}
      <InputGroup>
        <input
          type="file"
          id={name}
          name={name}
          ref={inputRef}
          onChange={handlePreview}
          {...rest}
        />
        <Button type="button" backgroundColor="#CED4DA" color="#212529">
          <label htmlFor={name}>{buttonText}</label>
        </Button>
        <span>{filename}</span>
      </InputGroup>
    </Container>
  );
};

export default FileInputWithPreview;

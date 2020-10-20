import React, { useCallback, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import FileInput from '../../components/File';
import Button from '../../components/Button';

interface IFormData {
  test: File;
}

const Test: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const [file, setFile] = useState({} as File);
  const [selected, setSelected] = useState(false);

  const handleAdd = useCallback(({ test }: IFormData) => {
    setFile(test);
    console.log(test);
    formRef.current?.reset();
  }, []);

  const handleGet = useCallback(() => {
    formRef.current?.setFieldValue('test', file);
    setSelected(true);
  }, [file]);

  const handleUpdate = useCallback(({ test }: IFormData) => {
    setFile(test);
    console.log(test);
    formRef.current?.reset();
  }, []);

  return (
    <Form ref={formRef} onSubmit={!selected ? handleAdd : handleUpdate}>
      <FileInput name="test" buttonText="Teste" />

      <Button type="submit">Enviar</Button>
      <Button onClick={handleGet} type="button">
        Selecionar
      </Button>
      <Button type="submit">Atualizar</Button>
    </Form>
  );
};

export default Test;

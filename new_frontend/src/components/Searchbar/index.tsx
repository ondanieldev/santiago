import React from 'react';
import { FiSearch } from 'react-icons/fi';

import { Container, Button } from './styles';
import Input from '../Input';

interface IProps {
  name: string;
  placeholder: string;
}

const Searchbar: React.FC<IProps> = ({ name, placeholder }) => {
  return (
    <Container>
      <Button type="submit">
        <FiSearch size={20} />
      </Button>

      <Input name={name} placeholder={placeholder} search />
    </Container>
  );
};

export default Searchbar;

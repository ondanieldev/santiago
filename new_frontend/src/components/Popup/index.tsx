import React from 'react';
import { FiX } from 'react-icons/fi';

import { Container, Title, Body } from './styles';

interface IProps {
  title: string;
  handleClosePopup(): void;
}

const Popup: React.FC<IProps> = ({ title, handleClosePopup, children }) => {
  return (
    <Container>
      <div>
        <Title>
          <h1>{title}</h1>
          <FiX size={20} color="#f44336" onClick={handleClosePopup} />
        </Title>
        <Body>{children}</Body>
      </div>
    </Container>
  );
};

export default Popup;

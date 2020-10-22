import React from 'react';
import { FiClipboard, FiDownload } from 'react-icons/fi';

import { Container } from './styles';

interface IProps {
  name: string;
  link: string;
}

const Document: React.FC<IProps> = ({ name, link }) => (
  <Container href={link} target="_blank" rel="noopener noreferrer">
    <FiClipboard size={40} />
    <div>
      <FiDownload />
      <span>{name}</span>
    </div>
  </Container>
);

export default Document;

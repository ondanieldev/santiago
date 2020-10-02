import React from 'react';

import { Container } from './styles';

interface IProps {
  title: string;
  subtitle?: string;
}

const Title: React.FC<IProps> = ({ title, subtitle }) => (
  <Container>
    <h1>{title}</h1>
    {subtitle && <h2>{subtitle}</h2>}
  </Container>
);

export default Title;

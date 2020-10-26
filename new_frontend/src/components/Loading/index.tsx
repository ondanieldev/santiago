import React from 'react';

import { Container } from './styles';
import loadingSVG from '../../assets/images/loading.svg';

interface IProps {
  show: boolean;
}

const Loading: React.FC<IProps> = ({ show }) => {
  return (
    <>
      {show && (
        <Container>
          <img src={loadingSVG} alt="loading" />
        </Container>
      )}
    </>
  );
};

export default Loading;

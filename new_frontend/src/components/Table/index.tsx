import React from 'react';

import { Container, VoidMessage } from './styles';

interface IProps {
  isVoid: boolean;
  voidMessage: string;
}

const Table: React.FC<IProps> = ({ isVoid, voidMessage, children }) => {
  return (
    <>
      {!isVoid && <Container>{children}</Container>}
      {isVoid && (
        <VoidMessage>
          <span>{voidMessage}</span>
        </VoidMessage>
      )}
    </>
  );
};

export default Table;

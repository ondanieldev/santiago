import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.table`
  width: 100%;
  text-align: center;

  thead {
    tr {
      background-color: var(--blue);
      color: var(--white);
    }
  }

  td {
    padding: 12px;
  }

  tbody {
    cursor: pointer;

    tr {
      transition: background-color 0.1s;
    }

    tr:nth-child(odd) {
      background-color: var(--white);
    }

    tr:nth-child(even) {
      background-color: var(--gray);
    }

    tr:hover {
      background-color: ${shade(0.1, '#FFCF00')};
    }
  }
`;

export const VoidMessage = styled.div`
  display: flex;
  justify-content: center;
`;

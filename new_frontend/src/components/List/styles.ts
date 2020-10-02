import styled from 'styled-components';

export const Container = styled.ul`
  margin-top: 24px;
  padding-left: 0;
  list-style: none;
  border-radius: 5px;
  border: 2px solid var(--black);
  overflow: hidden;

  li {
    display: flex;
    align-items: center;
    padding: 16px;

    & + li {
      border-top: 2px solid var(--black);
    }

    svg {
      cursor: pointer;
      margin-right: 12px;
      transition: color 0.1s linear;

      &:hover {
        color: var(--green);
      }

      & + svg {
        &:hover {
          color: var(--red);
        }
      }
    }
  }
`;

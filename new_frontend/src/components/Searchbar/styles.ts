import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  display: flex;
  margin-bottom: 24px;
`;

export const Button = styled.button`
  padding: 0 18px;
  border-radius: 5px 0 0 5px;
  background-color: var(--blue);
  color: var(--white);
  border: 2px solid var(--black);
  border-right: none;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${shade(0.2, '#013C64')};
  }
`;

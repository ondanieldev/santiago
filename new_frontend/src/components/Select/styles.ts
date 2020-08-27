import styled from 'styled-components';

export const Container = styled.div`
  padding: 16px;
  border-radius: 5px;
  border: 0;
  background: var(--white);
  width: 100%;
  display: flex;
  align-items: center;

  border: 2px solid var(--black);
  color: var(--black);
  transition: all 0.2s;

  & + div {
    margin-top: 8px;
  }

  svg {
    margin-right: 16px;
  }

  select {
    cursor: pointer;
    font-size: 16px;
    color: var(--black);
    background: transparent;
    border: 0;
    flex: 1;
    align-items: center;
    padding-right: 16px;
  }
`;

import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const InputGroup = styled.div`
  display: flex;
  align-items: center;
  color: var(--black);

  input {
    visibility: hidden;
    display: none;
  }

  label {
    cursor: pointer;
  }

  span {
    margin-left: 12px;
  }
`;

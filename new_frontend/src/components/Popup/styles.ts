import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;

  > div {
    background-color: var(--white);
    box-shadow: var(--shadow);
    border-radius: 5px;
  }
`;

export const Title = styled.div`
  width: 100%;
  padding: 24px;
  border-bottom: 2px solid var(--blue);
  display: flex;
  justify-content: space-between;

  svg {
    cursor: pointer;
    transition: transform 0.2s;

    &:hover {
      transform: rotate(90deg);
    }
  }
`;

export const Body = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
`;

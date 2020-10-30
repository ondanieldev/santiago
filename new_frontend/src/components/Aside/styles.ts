import styled, { keyframes } from 'styled-components';

const appearFromLeft = keyframes`
  from {
    transform: translateX(-300px);
  },
  to {
    transform: translateX(0px);
  }
`;

const appear = keyframes`
  from {
    opacity: 0;
  },
  to {
    opacity: 1;
  }
`;

export const Container = styled.aside`
  grid-area: aside;
  height: 100%;
`;

export const AnimatedContainer = styled.aside`
  background-color: var(--gray);
  height: 100%;
  animation: ${appearFromLeft} 0.5s;
  z-index: 101;

  ul {
    list-style: none;
    overflow: hidden;
    background-color: var(--blue);

    li {
      background-color: var(--gray);
      width: 100%;
      padding: 12px;
      transition: transform 0.2s;
      border-left: 5px solid var(--blue);
      cursor: pointer;

      &:hover {
        transform: translateX(24px);
      }

      &:hover > a,
      &:hover > button {
        color: var(--blue);
      }

      button {
        background: transparent;
        border: 0;
        color: var(--black);
      }
    }
  }

  @media (max-width: 900px) {
    position: fixed;
    left: 0;
    top: 80px;
    width: 300px;
  }
`;

export const Mask = styled.div`
  position: fixed;
  top: 80px;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 100;
  animation: ${appear} 0.5s;
`;

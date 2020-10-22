import styled, { keyframes } from 'styled-components';

import singInBackgroundImage from '../../assets/images/sign-in-background.jpg';

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  },
  to {
    opacity: 1;
    transform: translateX(0px);
  }
`;

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const AnimatedContent = styled.div`
  animation: ${appearFromLeft} 1s;

  form {
    width: 300px;
    margin: 40px 0;
    display: flex;
    flex-direction: column;

    div {
      & + div {
        margin-top: 6px;
      }
    }

    button {
      margin-top: 12px;
    }
  }
`;

export const Background = styled.div`
  flex: 1%;
  background: url(${singInBackgroundImage}) no-repeat center;
  background-size: cover;
`;

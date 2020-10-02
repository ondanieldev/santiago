import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  :root{
    --red: #f44336;
    --green: #4caf50;
    --blue: #013C64;
    --yellow: #FFCF00;
    --white: #F7F6FC;
    --black: #212529;
    --gray: #CED4DA;
    --aside-width: 300px;
    --header-height: 80px;
    --shadow: 0px 8px 8px rgba(0,0,0,0.3);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  body {
    background: var(--white);
    color: var(--black);
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font-family: 'Roboto Slab', serif;
    font-size: 16px;
  }

  h1, h2, h3, h4, h5, h6, strong, b {
    font-weight: 500;
    color: var(--blue);
  }

  button {
    cursor: pointer;
  }

  a {
    color: var(--black);
    text-decoration: none;
  }

  ::-webkit-scrollbar{
    width: 6px;
  }
  ::-webkit-scrollbar-track{
      background-color: red;
  }
  ::-webkit-scrollbar-track-piece{
      background-color: var(--gray);
  }
  ::-webkit-scrollbar-thumb{
      background-color: var(--blue);
  }
`;

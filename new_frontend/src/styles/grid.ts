import styled from 'styled-components';

export const BaseGridTemplate = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: var(--aside-width) 1fr;
  grid-template-rows: var(--header-height) 1fr;
  grid-template-areas:
    'header header'
    'aside main';

  @media (max-width: 900px) {
    grid-template-areas:
      'header header'
      'main main';
  }
`;

export const BaseGridMain = styled.main`
  grid-area: main;
  padding: 24px;
`;

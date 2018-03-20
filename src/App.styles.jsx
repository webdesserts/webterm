import styled from 'styled-components';

export const Terminal = styled.main`
  display: grid;
  grid-template-rows: 1fr auto auto;
  height: 100%;
  position: relative;
  &::before {
  }
`;

export const Seperator = styled.hr`
  border: none;
  border-top: 2px solid var(--magenta);
  width: 100%;
  margin: 0;
`;

export const Titlebar = styled.div`
  color: var(--light-grey);
  padding: 16px;
  text-align: center;
  display: block;
  position: absolute;
  pointer-events: none;
  background: no-repeat linear-gradient(to bottom, var(--black), transparent);
  height: 200px;
  width: 100%;
  top: 0;
  z-index: 1;
`;

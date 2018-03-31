import styled from 'styled-components';

export const Terminal = styled.main`
  display: grid;
  grid-template-rows: 1fr auto auto;
  height: 100%;
  position: relative;
`;

export const Seperator = styled.hr`
  border: none;
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
  height: 140px;
  width: 100%;
  top: 0;
  z-index: 1;
`;

export const Loading = styled.div``;

import * as React from 'react';
import styled from 'styled-components';

const PromptBar = styled.div`
  display: grid;
  align-items: center;
  /* background-color: var(--pitchblack); */
  border-radius: 2px;
`;

export function Prompt() {
  return <PromptBar>michael@ymir></PromptBar>;
}

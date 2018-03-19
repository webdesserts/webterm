import * as React from 'react';
import styled from 'styled-components';
import { InputIndicator } from './indicators';

const CenteredContent = styled.div`
  margin: 0 auto;
  max-width: 600px;
  width: 100%;
  display: grid;
  grid-template-columns: 24px 1fr;
  grid-gap: 8px 0;
  padding: 16px 16px 16px 24px;
  align-items: baseline;
`;

const Location = styled.div`
  grid-column: span 2;
  color: var(--light-grey);
`;

const Input = styled.input.attrs({ type: 'text' })`
  background-color: transparent;
  border: none;
  color: var(--white);
  font: inherit;
`;

export function Prompt() {
  let location = '//';
  let input = 'cd code';
  return (
    <React.Fragment>
      <CenteredContent>
        <Location>{location}</Location>
        <InputIndicator />
        <Input value={input} />
      </CenteredContent>
    </React.Fragment>
  );
}

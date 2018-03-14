import * as React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  border-top: 2px solid var(--grey);
  padding: 16px;
`

const CenteredContent = styled.div`
  margin: 0 auto;
  max-width: 600px;
  width: 100%;
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: 24px 1fr;
  grid-gap: 8px 8px;
`

const Indicator = styled.div`
  font-size: 25px;
  font-weight: 600;
`

const Location = styled.div`
  grid-column: span 2;
  color: var(--light-grey);
`

const Input = styled.input.attrs({ type: 'text' })`
  background-color: transparent;
  border: none;
  color: var(--white);
  font-size: inherit;
`

export function Prompt() {
  return (
    <Wrapper>
      <CenteredContent>
        <Location>//</Location>
        <Indicator>»</Indicator><Input value={'cd code'}/>
      </CenteredContent>
    </Wrapper>
  );
}

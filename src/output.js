import * as React from 'react';
import styled from 'styled-components'
import { InputIndicator, OutputIndicator } from './indicators'

const CenteredContent = styled.div`
  margin: 0 auto;
  max-width: 600px;
  width: 100%;
  display: grid;
  grid-template-columns: auto;
  grid-row-gap: 32px;
  align-content: end;
  padding: 16px;
`

const Result = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: 24px 1fr;
  grid-gap: 8px 8px;
  align-items: baseline;
`

export function Output() {
  return (
    <React.Fragment>
      <CenteredContent>
        <Result>
          <InputIndicator/><div>hello-world</div>
          <OutputIndicator/><div>Hello World!</div>
        </Result>
        <Result>
          <InputIndicator/><div>hello-world</div>
          <OutputIndicator/><div> Hello World!</div>
        </Result>
      </CenteredContent>
    </React.Fragment>
  );
}

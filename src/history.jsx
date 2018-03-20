import * as React from 'react';
import styled from 'styled-components';
import * as indicators from './indicators';

const HistoryWrapper = styled.div`
  overflow: auto;
  padding-top: 100px;
`;

const CenteredContent = styled.div`
  margin: 0 auto;
  display: grid;
  max-width: 600px;
  width: 100%;
  grid-row-gap: 16px;
  align-content: end;
  padding: 16px;
`;

const Result = styled.div`
  display: grid;
  grid-template-columns: min-content minmax(40%, min-content) auto;
  grid-gap: 8px 8px;
  align-items: top;
  line-height: 1.2rem;
`;

const Input = styled.code`
  color: var(--magenta);
  word-wrap: break-word;
  overflow: hidden;
`;
const Location = styled.span`
  color: var(--light-grey);
  margin-left: auto;
`;

const OutputList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;

  li {
  }
`;

const Output = styled.div`
  background-color: var(--pitch-black);
  border-radius: 2px;
  padding: 16px;
  grid-column: span 3;

  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 8px;
`;

export function OutputValue({ output }) {
  if (Array.isArray(output)) {
    return (
      <OutputList>
        {output.map((item, i) => (
          <li key={i}>
            <OutputValue output={item} />
          </li>
        ))}
      </OutputList>
    );
  } else if (typeof output === 'string' || output === null) {
    return output;
  } else if (output instanceof Error) {
    return output.toString();
  } else {
    throw new Error(
      'we have not implemented rendering for this type of output yet',
    );
  }
}

export function History({ history }) {
  return (
    <HistoryWrapper
      innerRef={ref => {
        if (ref) ref.scrollTop = ref.scrollHeight;
      }}
    >
      <CenteredContent>
        {history.map(result => (
          <CommandResult key={result.timestamp.getTime()} result={result} />
        ))}
      </CenteredContent>
    </HistoryWrapper>
  );
}

const InputIndicator = styled(indicators.InputIndicator)`
  margin-left: 16px;
`;

export function CommandResult({ result }) {
  return (
    <Result>
      <InputIndicator />
      <Input>{result.input}</Input>
      <Location>{result.location}</Location>
      {result.output ? (
        <Output>
          <indicators.OutputIndicator />
          <OutputValue output={result.output} />
        </Output>
      ) : null}
    </Result>
  );
}

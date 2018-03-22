import * as React from 'react';
import { OutputIndicator } from './indicators';
import * as el from './history.styles';

export function OutputValue({ output }) {
  if (Array.isArray(output)) {
    return (
      <el.OutputList>
        {output.map((item, i) => (
          <li key={i}>
            <OutputValue output={item} />
          </li>
        ))}
      </el.OutputList>
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
    <el.HistoryWrapper
      innerRef={ref => {
        if (ref) ref.scrollTop = ref.scrollHeight;
      }}
    >
      <el.CenteredContent>
        {history.map(result => (
          <CommandResult key={result.timestamp.getTime()} result={result} />
        ))}
      </el.CenteredContent>
    </el.HistoryWrapper>
  );
}

export function CommandResult({ result }) {
  return (
    <el.Result>
      <el.InputIndicator />
      <el.Input>
        {result.command ? (
          <React.Fragment>
            <el.Command>{result.command.name}</el.Command>{' '}
            <el.Args>{result.command.args.join(' ')}</el.Args>
          </React.Fragment>
        ) : (
          result.input
        )}
      </el.Input>
      <el.Location>{result.location}</el.Location>
      {result.output ? (
        <el.Output>
          <OutputIndicator />
          <OutputValue output={result.output} />
        </el.Output>
      ) : null}
    </el.Result>
  );
}

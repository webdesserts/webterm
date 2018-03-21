import * as React from 'react';
import PropTypes from 'prop-types';
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

export class Prompt extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    history: PropTypes.array,
  };

  static defaultProps = {
    onSubmit: () => {},
  };

  state = {
    value: '',
    historyIndex: null,
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ historyIndex: nextProps.history.length });
  }

  onKeyDown = event => {
    let { history, onSubmit } = this.props;
    let { value, historyIndex: currentHistoryIndex } = this.state;

    if (event.key === 'Enter') {
      onSubmit(value);
      this.setState({ value: '' });
    } else if (event.key === 'ArrowUp') {
      let historyIndex = currentHistoryIndex - 1;
      let command = history[historyIndex];
      if (command) {
        this.setState({
          historyIndex,
          value: command.input,
        });
      }
    } else if (event.key === 'ArrowDown') {
      let historyIndex = currentHistoryIndex + 1;
      let command = history[historyIndex];
      if (command) {
        this.setState({
          historyIndex,
          value: command.input,
        });
      }
    }
  };

  onChange = event => {
    let { value } = event.target;
    this.setState({ value });
  };

  render() {
    let location = '//';

    return (
      <React.Fragment>
        <CenteredContent>
          <Location>{location}</Location>
          <InputIndicator />
          <Input
            value={this.state.value}
            onChange={this.onChange}
            onKeyDown={this.onKeyDown}
          />
        </CenteredContent>
      </React.Fragment>
    );
  }
}

import React, { Component } from 'react';
import styled from 'styled-components';
import { Prompt } from './prompt';
import { Output } from './output';
import './global.styles.jsx';

const Terminal = styled.main`
  display: grid;
  grid-template-rows: 1fr auto auto;
  height: 100%;
`;

const Seperator = styled.hr`
  border: none;
  border-top: 2px solid var(--grey);
  width: 100%;
`

class App extends Component {
  render() {
    return (
      <Terminal>
        <Output />
        <Seperator/>
        <Prompt />
      </Terminal>
    );
  }
}

export default App;

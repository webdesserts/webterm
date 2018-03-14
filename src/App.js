import React, { Component } from 'react';
import styled from 'styled-components';
import { Prompt } from './prompt';
import { Output } from './output';
import './global.styles.jsx';

const Terminal = styled.main`
  display: grid;
  grid-template-rows: 1fr auto;
  height: 100%;
`;

class App extends Component {
  render() {
    return (
      <Terminal>
        <Output />
        <Prompt />
      </Terminal>
    );
  }
}

export default App;

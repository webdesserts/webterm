import React, { Component } from 'react';
import styled from 'styled-components';
import { Prompt } from './prompt';
import { History } from './history';
import './global.styles.jsx';

const Terminal = styled.main`
  display: grid;
  grid-template-rows: 1fr auto auto;
  height: 100%;
  position: relative;
  &::before {
  }
`;

const Seperator = styled.hr`
  border: none;
  border-top: 2px solid var(--magenta);
  width: 100%;
  margin: 0;
`;

const Titlebar = styled.div`
  color: var(--light-grey);
  padding: 16px;
  text-align: center;
  display: block;
  position: absolute;
  pointer-events: none;
  background: no-repeat linear-gradient(to bottom, var(--black), transparent);
  height: 200px;
  width: 100%;
  top: 0;
  z-index: 1;
`;

class App extends Component {
  render() {
    let now = new Date(Date.now());
    let history = [
      // what the hell is even happening ~MM
      // { timestamp: new Date(now - 9000),  input: 'echo "Hello, World!"', output: '"Hello, World!"', location: '//' },

      {
        timestamp: new Date(now - 51000),
        input: 'pwd',
        output: '"//"',
        location: '//',
      },
      {
        timestamp: new Date(now - 39000),
        input: 'cd code',
        output: null,
        location: '//',
      },
      {
        timestamp: new Date(now - 36000),
        input: 'pwd',
        output: '"//code"',
        location: '//code',
      },
      {
        timestamp: new Date(now - 33000),
        input: 'ls',
        output: ['webterm', 'beaker', 'www-webdesserts'],
        location: '//code',
      },
      {
        timestamp: new Date(now - 30000),
        input: 'cd ../',
        output: null,
        location: '//',
      },
      {
        timestamp: new Date(now - 27000),
        input: 'pwd',
        output: '"//"',
        location: '//',
      },
      {
        timestamp: new Date(now - 24000),
        input: 'cd code',
        output: null,
        location: '//',
      },
      {
        timestamp: new Date(now - 21000),
        input: 'pwd',
        output: '"//code"',
        location: '//code',
      },
      {
        timestamp: new Date(now - 18000),
        input: 'ls',
        output: ['webterm', 'beaker', 'www-webdesserts'],
        location: '//code',
      },
      {
        timestamp: new Date(now - 15000),
        input: 'cd ../',
        output: null,
        location: '//',
      },
      {
        timestamp: new Date(now - 12000),
        input: 'pwd',
        output: '"//"',
        location: '//',
      },
      {
        timestamp: new Date(now - 9000),
        input: 'cd code',
        output: null,
        location: '//',
      },
      {
        timestamp: new Date(now - 6000),
        input: 'pwd',
        output: '"//code"',
        location: '//code',
      },
      {
        timestamp: new Date(now - 3000),
        input: 'ls',
        output: ['webterm', 'beaker', 'www-webdesserts'],
        location: '//code',
      },
      {
        timestamp: new Date(now - 1000),
        input: 'cd ../',
        output: null,
        location: '//',
      },
    ];

    return (
      <Terminal>
        <Titlebar>dat://dev.webdesserts.com</Titlebar>
        <History history={history} />
        <Seperator />
        <Prompt />
      </Terminal>
    );
  }
}

export default App;

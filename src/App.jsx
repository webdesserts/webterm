import React, { Component } from 'react';
import * as commands from './commands';
import './global.styles.jsx';

import { Prompt } from './prompt';
import { History } from './history';
import * as el from './App.styles';

class App extends Component {
  state = {
    history: [],
    home:
      'dat://d4c7b6b2af5c361e63fd9cd6b02452b70a9a8b8612183a90c366b01ee6588631',
    url:
      'dat://d4c7b6b2af5c361e63fd9cd6b02452b70a9a8b8612183a90c366b01ee6588631',
  };

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  async onSubmit(input) {
    let { url } = this.state;
    const result = await commands.execute(input, new URL(url));
    const new_history = this.state.history.concat([result]);
    this.setState({ history: new_history });
  }

  render() {
    let url = new URL(this.state.url);
    let home = new URL(this.state.home);
    let isHome = url.origin === home.origin;
    return (
      <el.Terminal>
        <el.Titlebar>{url.origin}</el.Titlebar>
        <History history={this.state.history} home={home} />
        <el.Seperator />
        <Prompt
          history={this.state.history}
          onSubmit={this.onSubmit}
          isHome={isHome}
          url={url}
        />
      </el.Terminal>
    );
  }
}

export default App;

import React, { Component } from 'react';
import * as commands from './commands';
import './global.styles.jsx';

import { Prompt } from './prompt';
import { History } from './history';
import * as el from './App.styles';

class App extends Component {
  state = { history: [] };

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  async onSubmit(input) {
    const result = await commands.execute(input);
    const new_history = this.state.history.concat([result]);
    this.setState({ history: new_history });
  }

  render() {
    return (
      <el.Terminal>
        <el.Titlebar>dat://dev.webdesserts.com</el.Titlebar>
        <History history={this.state.history} />
        <el.Seperator />
        <Prompt history={this.state.history} onSubmit={this.onSubmit} />
      </el.Terminal>
    );
  }
}

export default App;

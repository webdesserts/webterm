import React, { Component } from 'react';
import * as commands from './commands';
import { Environment } from './environment';
import * as fixtures from './fixtures';
import './global.styles.jsx';

import { Prompt } from './prompt';
import { History } from './history';
import * as el from './App.styles';

class App extends Component {
  onEnvironmentChange = env => {
    this.setState({ env });
  };

  state = {
    history: [],
    env: new Environment({
      home: fixtures.HOME,
      cwd: fixtures.HOME,
      onChange: this.onEnvironmentChange,
    }),
  };

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  async onSubmit(input) {
    let { env } = this.state;
    const result = await commands.execute(input, env);
    const new_history = this.state.history.concat([result]);
    this.setState({ history: new_history });
  }

  render() {
    let { env } = this.state;
    let isHome = env.cwd.origin === env.home.origin;
    return (
      <el.Terminal>
        <el.Titlebar>{env.cwd.origin}</el.Titlebar>
        <History history={this.state.history} home={env.home} />
        <el.Seperator />
        <Prompt
          history={this.state.history}
          onSubmit={this.onSubmit}
          isHome={isHome}
          url={env.cwd}
        />
      </el.Terminal>
    );
  }
}

export default App;

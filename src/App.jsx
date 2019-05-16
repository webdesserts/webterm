import * as React from 'react';
import { loadCommands, loadTermManifest, executeCommand } from './commands';
import { Environment } from './environment';
import * as fixtures from './fixtures';
import './global.styles';

import { Prompt } from './prompt';
import { History } from './history';
import * as el from './App.styles';

class App extends React.Component {
  onEnvironmentChange = env => {
    this.setState({ env });
  };

  state = {
    history: new Array(),
    env: new Environment({
      home: fixtures.HOME,
      cwd: fixtures.HOME,
      commands: new Map(),
      onChange: this.onEnvironmentChange,
    }),
  };

  async componentDidMount() {
    let url = new URL(window.location.href);
    let manifest = await loadTermManifest(url);
    let commands = await loadCommands(manifest, new URL('./env/', url));
    let env = Environment.copy(this.state.env, { commands });
    this.setState({ env });
  }

  onSubmit = async input => {
    let { env } = this.state;
    const result = await executeCommand(input, env);
    const new_history = this.state.history.concat([result]);
    this.setState({ history: new_history });
  };

  render() {
    let { env } = this.state;
    let isHome = env.cwd.origin === env.home.origin;
    if (!env.commands.size) return <el.Loading>Loading...</el.Loading>;
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

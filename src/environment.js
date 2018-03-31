export class Environment {
  static copy(env, opts) {
    return new Environment(
      Object.assign(
        {
          home: env.home,
          cwd: env.cwd,
          commands: new Map(env.commands),
          onChange: env._onChange,
        },
        opts,
      ),
    );
  }

  constructor({ home, cwd, commands, onChange }) {
    this.home = home;
    this.cwd = cwd;
    this.commands = Object.freeze(commands);
    this._onChange = onChange;
  }

  async setCWD(cwd) {
    let env = Environment.copy(this, { cwd });
    this._onChange(env);
  }
}

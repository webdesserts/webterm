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
    let home_url = new URL(home);
    let cwd_url = new URL(cwd);
    this.home = Object.freeze(home_url);
    this.cwd = Object.freeze(cwd_url);
    this.commands = Object.freeze(commands);
    this.archive = new window.DatArchive(cwd_url.origin);
    this._onChange = onChange;
  }

  async setCWD(cwd) {
    let env = Environment.copy(this, { cwd });
    this._onChange(env);
  }
}

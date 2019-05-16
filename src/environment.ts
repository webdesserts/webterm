interface EnvOptions {
  home: string;
  cwd: string;
  commands: Map<string, URL>;
  onChange: (env: Environment) => void;
}

interface SerializedEnv {
  cwd: string;
}

export class Environment {
  home: URL;
  cwd: URL;
  commands: Map<string, URL>;
  _onChange: EnvOptions['onChange'];

  constructor({ home, cwd, commands, onChange }: EnvOptions) {
    this.home = new URL('', home);
    this.cwd = new URL('', cwd);
    this.commands = Object.freeze(commands) as any;
    this._onChange = onChange;
  }

  setCWD(cwd) {
    let env = Environment.copy(this, { cwd });
    this._onChange(env);
  }

  serialize(): SerializedEnv {
    return { cwd: this.cwd.href };
  }

  static copy(env: Environment, opts: Partial<EnvOptions>) {
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
}

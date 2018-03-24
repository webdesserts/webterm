export class Environment {
  constructor({ home, cwd, onChange }) {
    let home_url = new URL(home);
    let cwd_url = new URL(cwd);
    this.home = home_url;
    this.cwd = cwd_url;
    this.archive = new window.DatArchive(cwd_url.origin);
    this._onChange = onChange;
  }

  async setCWD(dir) {
    let onChange = this._onChange;
    let env = new Environment({
      home: this.home,
      cwd: dir,
      onChange,
    });
    onChange(env);
  }
}

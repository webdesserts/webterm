export const HOME =
  'dat://87ed2e3b160f261a032af03921a3bd09227d0a4cde73466c17114816cae43336/';

export const commands = [
  { name: 'ls', execute: ls },
  { name: 'cd', execute: cd },
  { name: 'pwd', execute: pwd },
  { name: 'echo', execute: echo },
];

async function ls(env, args, opts = {}) {
  let { archive, cwd } = env;

  // read
  let listing = await archive.readdir(cwd.pathname, { stat: true });

  return listing
    .filter(entry => {
      if (opts.all || opts.a) return true;
      return entry.name.startsWith('.') === false;
    })
    .sort((a, b) => {
      // dirs on top
      if (a.stat.isDirectory() && !b.stat.isDirectory()) return -1;
      if (!a.stat.isDirectory() && b.stat.isDirectory()) return 1;
      return a.name.localeCompare(b.name);
    })
    .map(entry => entry.name);
}

async function cd(env, args, opts = {}) {
  let [dir] = args;
  if (!dir) env.setCWD(env.cwd.origin);
  else {
    if (!dir.endsWith('/')) dir += '/';
    env.setCWD(new URL(dir, env.cwd));
  }
  return undefined;
}

async function echo(env, args, opts = {}) {
  return args.join(' ');
}

async function pwd(env, args, opts = {}) {
  return env.cwd;
}

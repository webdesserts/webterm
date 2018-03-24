export const HOME =
  'dat://d4c7b6b2af5c361e63fd9cd6b02452b70a9a8b8612183a90c366b01ee6588631';

function quickOutput(name) {
  return () => name;
}

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

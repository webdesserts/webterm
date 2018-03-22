function quickOutput(name) {
  return () => name;
}

export const commands = [
  { name: 'ls', execute: ls },
  { name: 'cd', execute: cd },
  { name: 'pwd', execute: quickOutput('//') },
  { name: 'echo', execute: quickOutput('echo') },
];

function cd(args) {
  return undefined;
}

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

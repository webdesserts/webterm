// TODO
// - [x] expose cwd
// - [ ] expose readdir
// - [ ] expose stats
// - [ ] expose isDirectory

async function command(env, args) {
  console.log('executing ls');
  console.log('env:', env);

  // let { archive, cwd } = env;

  // // read
  // let listing = await archive.readdir(cwd.pathname, { stat: true });

  // return listing
  //   .filter(entry => {
  //     if (opts.all || opts.a) return true;
  //     return entry.name.startsWith('.') === false;
  //   })
  //   .sort((a, b) => {
  //     // dirs on top
  //     if (a.stat.isDirectory() && !b.stat.isDirectory()) return -1;
  //     if (!a.stat.isDirectory() && b.stat.isDirectory()) return 1;
  //     return a.name.localeCompare(b.name);
  //   })
  //   .map(entry => entry.name);

  throw new Error('Not yet implemented');
}

onmessage = async function runCommand(e) {
  let [{ env: envOpts, args, commandStr }] = e.data;

  let env = new CommandEnvironment(envOpts);

  // should we isolate this command's variable scope via an iife? Do we even need to?
  eval(commandStr);

  if (command && typeof command === 'function') {
    postMessage({ output: await command(env, args) });
  } else {
    throw Error(`"command" function was never defined`);
  }
};

class CommandEnvironment {
  constructor(opts) {
    this.cwd = new URL('', opts.cwd);
    this.archive = new WorkerDatArchive();
  }

  // POST "env.setCWD" url
  async setCWD(string) {}
}

// let archive = await env.requestArchive("dat://ffffffffffffffffffffffff")
class WorkerDatArchive {
  //get url () { throw new Error('not yet implemented') }

  //POST "archive.getInfo" archive_url, opts
  //getInfo() { throw new Error('not yet implemented') }

  //POST "archive.stat" archive_url, path, opts
  stat() {
    throw new Error('not yet implemented');
  }

  //POST "archive.readFile" archive_url, opts
  //readFile() { throw new Error('not yet implemented') }

  //POST "archive.readdir" archive_url, path, opts
  readdir() {
    throw new Error('not yet implemented');
  }

  //POST "archive.writeFile" archive_url, path, opts
  //writeFile() { throw new Error('not yet implemented') }

  //   mkdir() { throw new Error('not yet implemented') }
  //   unlink() { throw new Error('not yet implemented') }
  //   rmdir() { throw new Error('not yet implemented') }
  //   history() { throw new Error('not yet implemented') }
  //   download() { throw new Error('not yet implemented') }
}

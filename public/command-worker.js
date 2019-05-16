onmessage = async function runCommand(e) {
  let { env, args, commandStr } = e.data;

  console.log(commandStr);
  // is there a way to isolate this command's variable scope? iife?
  eval(commandStr);

  if (command && typeof command === 'function') {
    postMessage({ output: await command(env, args) });
  } else {
    throw Error(`"command" function was never defined`);
  }
};

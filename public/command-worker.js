onmessage = async function runCommand(e) {
  let [{ env, args, commandStr }] = e.data;

  // should we isolate this command's variable scope via an iife? Do we even need to?
  eval(commandStr);

  if (command && typeof command === 'function') {
    postMessage({ output: await command(env, args) });
  } else {
    throw Error(`"command" function was never defined`);
  }
};

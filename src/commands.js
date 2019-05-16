export async function loadTermManifest(location) {
  let url = new URL(location);
  let file_url = new URL('./env/term.json', url.origin);
  let response = await fetch(file_url);
  return JSON.parse(await response.text());
}

export async function loadCommands(manifest, manifest_url) {
  let map = new Map();

  for (let command of manifest.commands) {
    let url = new URL(command, manifest_url);
    let { filename } = fileDetails(url);
    map.set(filename, url);
  }

  return map;
}

let fileDetailsRegex = /([^/]+?)(\.\w+)?$/;
function fileDetails(url) {
  let [_, filename, extension] = url.pathname.match(fileDetailsRegex);
  return { filename, extension };
}

export async function executeCommand(input, env) {
  const result = {
    timestamp: new Date(Date.now()),
    input,
    command: null,
    url: env.cwd,
  };

  const parsed_command = await parse(input);
  if (!parsed_command) return result;
  let { name, args } = parsed_command;

  const command = await env.commands.get(name);

  if (!command)
    return Object.assign(result, { output: new Error('Unknown Command') });

  const output = await launchCommandWorker(env, args);
  return Object.assign(result, { output, command: { name, args } });
}

function parse(input) {
  if (typeof input !== 'string') return null;
  let [name, ...args] = input.trim().split(' ');
  if (!name) return null;
  return { name, args };
}

async function launchCommandWorker(url, env, args) {
  let worker = new Worker('/command-worker.js');
  let response = await fetch(url.pathname);
  let commandStr = await response.text();
  return new Promise((resolve, reject) => {
    worker.postMessage({ env, args, commandStr });
    worker.onmessage = function(e) {
      console.log('data:', e.data);
      resolve(e.data.result.output);
    };
  });
}

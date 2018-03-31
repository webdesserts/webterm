import { WEBTERM } from './fixtures';

export async function loadTermManifest(url) {
  let file_url = new URL('./env/term.json', url.origin);
  let response = await fetch(file_url);
  return JSON.parse(await response.text());
}

export async function loadCommands(manifest, env_url) {
  let map = new Map();
  for (let command of manifest.commands) {
    let url = new URL(command, env_url);
    let { filename } = fileDetails(url);
    console.log('setting command:', filename, url);
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

  const command_url = await env.commands.get(name);

  if (!command_url)
    return Object.assign(result, { output: new Error('Unknown Command') });

  const output = await launchCommandWorker(command_url, env, args);
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
  let response = await fetch(url.toString());
  let commandStr = await response.text();
  return new Promise((resolve, reject) => {
    worker.postMessage([{ args, commandStr }]);
    worker.onmessage = function(e) {
      console.log('data:', e.data);
      resolve(e.data.output);
    };
  });
}

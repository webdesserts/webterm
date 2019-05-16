import { WEBTERM } from './fixtures';
import { Environment } from './environment';
import CommandWorker from './command.worker';

type CommandArgument = string | number;
type Manifest = { commands: string[] };
type CommandMap = Map<string, URL>;
type FileDetails = { filename: string; extension: string };
type CommandRecord = { name: string; args: CommandArgument[] };
type Record = {
  timestamp: Date;
  input: any;
  command: CommandRecord | null;
  url: URL;
};

// AST
// TODO: take some inspiration from estree
type CommandCall = { name: string; args: CommandArgument[] };
type Expression = CommandCall;
type AST = Expression | null;

export async function loadTermManifest(url: URL) {
  let file_url = new URL('./env/term.json', url.origin);
  let response = await fetch(file_url.toString());
  return JSON.parse(await response.text());
}

export async function loadCommands(
  manifest: Manifest,
  env_url: URL,
): Promise<CommandMap> {
  let map = new Map<string, URL>();
  console.log('env url:', env_url);
  for (let command of manifest.commands) {
    let url = new URL(command, env_url);
    let { filename } = fileDetails(url);
    console.log('setting command:', command, filename, url);
    map.set(filename, url);
  }

  return map;
}

const fileDetailsRegex = /([^/]+?)(\.\w+)?$/;
function fileDetails(url: URL): FileDetails {
  let [_, filename, extension] = url.pathname.match(fileDetailsRegex) as any;
  return { filename, extension };
}

export async function executeCommand(input, env: Environment): Promise<Record> {
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

function parse(input): AST {
  if (typeof input !== 'string') return null;
  let [name, ...args] = input.trim().split(' ');
  if (!name) return null;
  return { name, args };
}

async function launchCommandWorker<A>(
  url: URL,
  env: Environment,
  args: A,
): Promise<any> {
  let worker = new CommandWorker();
  let response = await fetch(url.toString());
  let commandStr = await response.text();
  return new Promise((resolve, reject) => {
    worker.postMessage([{ env: env.serialize(), args, commandStr }]);
    worker.onmessage = function(e) {
      console.log('data:', e.data);
      resolve(e.data.output);
    };
  });
}

import { commands } from './fixtures';

export async function execute(input, env) {
  const result = {
    timestamp: new Date(Date.now()),
    input,
    command: null,
    url: env.cwd,
  };

  const parsed_command = await parse(input);
  if (!parsed_command) return result;
  let { name, args } = parsed_command;

  const command = await commands.find(command => name === command.name);

  if (!command)
    return Object.assign(result, { output: new Error('Unknown Command') });

  const output = await command.execute(env, args);
  return Object.assign(result, { output, command: { name, args } });
}

function parse(input) {
  if (typeof input !== 'string') return null;
  let [name, ...args] = input.trim().split(' ');
  if (!name) return null;
  return { name, args };
}

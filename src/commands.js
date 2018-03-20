import { commands } from './fixtures';

export async function execute(input) {
  const result = {
    timestamp: new Date(Date.now()),
    input,
    location: '//',
  };

  const parsed_command = await parse(input);
  if (!parsed_command) return result;

  const command = await commands.find(
    command => parsed_command.name === command.name,
  );
  if (!command)
    return Object.assign(result, { output: new Error('Unknown Command') });

  const output = await command.execute();
  return Object.assign(result, { output });
}

//TODO: parse parameters and options(?)
function parse(input) {
  if (typeof input !== 'string') return null;
  const command = input.trim();
  if (!command.length) return null;
  return { name: command };
}

//TODO: validate command output
//function validateOutput () {}

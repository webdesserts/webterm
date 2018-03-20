function quickOutput(name) {
  return () => name;
}

export const commands = [
  { name: 'ls', execute: quickOutput(['work', 'code', 'Public']) },
  { name: 'cd', execute: quickOutput(undefined) },
  { name: 'pwd', execute: quickOutput('//') },
  { name: 'echo', execute: quickOutput('echo') },
];

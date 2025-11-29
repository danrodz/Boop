/**
  {
    "api": 1,
    "name": "Generate Random String",
    "description": "Generates random alphanumeric string",
    "author": "Boop",
    "icon": "dice.fill",
    "tags": "random,string,generate,alphanumeric"
  }
**/

function main(state) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const input = state.text.trim();
  const length = input && !isNaN(input) ? Math.min(Math.max(parseInt(input), 1), 1000) : 32;

  const array = new Uint8Array(length);
  crypto.getRandomValues(array);

  const result = Array.from(array)
    .map(x => chars[x % chars.length])
    .join('');

  state.insert(result);
}

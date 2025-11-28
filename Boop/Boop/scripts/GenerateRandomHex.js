/**
{
  "api": 1,
  "name": "Generate Random Hex",
  "description": "Generates random hex string (enter length)",
  "author": "Boop",
  "icon": "number",
  "tags": "random,hex,generate"
}
**/

function main(state) {
  const length = parseInt(state.text.trim()) || 32;
  const chars = '0123456789abcdef';
  let result = '';

  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  state.text = result;
}

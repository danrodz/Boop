/**
{
  "api": 1,
  "name": "Generate Random String",
  "description": "Generates random alphanumeric string (enter length)",
  "author": "Boop",
  "icon": "die.face.5",
  "tags": "random,string,generate"
}
**/

function main(state) {
  const length = parseInt(state.text.trim()) || 16;
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  state.text = result;
}

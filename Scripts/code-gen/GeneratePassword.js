/**
  {
    "api": 1,
    "name": "Generate Random Password",
    "description": "Generates a random password",
    "author": "Boop",
    "icon": "wand.and.stars",
    "tags": "generate,random,create"
  }
**/

function main(state) {
  const length = 16;
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  state.insert(password);
}

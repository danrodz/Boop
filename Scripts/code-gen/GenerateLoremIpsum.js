/**
  {
    "api": 1,
    "name": "Generate Lorem Ipsum",
    "description": "Generates Lorem Ipsum text",
    "author": "Boop",
    "icon": "wand.and.stars",
    "tags": "generate,random,create"
  }
**/

function main(state) {
  const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
  state.insert(lorem);
}

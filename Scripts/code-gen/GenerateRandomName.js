/**
  {
    "api": 1,
    "name": "Generate Random Name",
    "description": "Generates a random full name",
    "author": "Boop",
    "icon": "wand.and.stars",
    "tags": "generate,random,create"
  }
**/

function main(state) {
  const first = ['John', 'Jane', 'Bob', 'Alice', 'Charlie', 'Emma', 'David', 'Sarah'];
  const last = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis'];
  const name = first[Math.floor(Math.random() * first.length)] + ' ' + last[Math.floor(Math.random() * last.length)];
  state.insert(name);
}

/**
{
  "api": 1,
  "name": "Remove HTML and Keep Text",
  "description": "Removes HTML tags and decodes entities",
  "author": "Boop",
  "icon": "scissors",
  "tags": "html,remove,strip,clean"
}
**/

const { decode } = require('@boop/he')

function main(state) {
  // Remove tags
  let text = state.text.replace(/<[^>]+>/g, '');
  // Decode entities
  text = decode(text);
  state.text = text;
}

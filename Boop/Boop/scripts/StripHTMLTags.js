/**
{
  "api": 1,
  "name": "Strip HTML Tags",
  "description": "Removes all HTML tags from text",
  "author": "Boop",
  "icon": "scissors",
  "tags": "html,strip,remove,tags"
}
**/

function main(state) {
  state.text = state.text.replace(/<[^>]+>/g, '');
}

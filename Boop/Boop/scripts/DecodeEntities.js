/**
{
  "api": 1,
  "name": "Decode Numeric HTML Entities",
  "description": "Decodes numeric HTML entities (&#...;)",
  "author": "Boop",
  "icon": "textformat",
  "tags": "html,entities,decode,numeric"
}
**/

function main(state) {
  state.text = state.text.replace(/&#(\d+);/g, (match, dec) => {
    return String.fromCharCode(dec);
  });
}

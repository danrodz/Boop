/**
  {
    "api": 1,
    "name": "Smart to Straight Quotes",
    "description": "Converts curly/smart quotes to straight quotes",
    "author": "Boop",
    "icon": "quote.bubble",
    "tags": "quotes,smart,curly,straight,convert"
  }
**/

function main(state) {
  state.text = state.text
    .replace(/[\u2018\u2019\u201B]/g, "'")
    .replace(/[\u201C\u201D\u201F]/g, '"')
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/\u2026/g, "...");
  
  state.postInfo("Smart quotes converted to straight quotes");
}

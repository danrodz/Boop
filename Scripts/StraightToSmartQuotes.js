/**
  {
    "api": 1,
    "name": "Straight to Smart Quotes",
    "description": "Converts straight quotes to curly/smart quotes",
    "author": "Boop",
    "icon": "quote.bubble",
    "tags": "quotes,smart,curly,straight,convert,typographic"
  }
**/

function main(state) {
  var text = state.text;
  
  text = text.replace(/"([^"]*)"/g, "\u201C$1\u201D");
  text = text.replace(/'([^']*)'/g, "\u2018$1\u2019");
  text = text.replace(/(\s)'(\w)/g, "$1\u2018$2");
  text = text.replace(/(\w)'(\w)/g, "$1\u2019$2");
  text = text.replace(/(\w)'(\s|$)/g, "$1\u2019$2");
  text = text.replace(/---/g, "\u2014");
  text = text.replace(/--/g, "\u2013");
  text = text.replace(/\.\.\./g, "\u2026");
  
  state.text = text;
  state.postInfo("Converted to smart quotes");
}

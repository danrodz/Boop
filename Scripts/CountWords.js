/**
  {
    "api": 1,
    "name": "Count Words",
    "description": "Counts words, characters, lines, and paragraphs",
    "author": "Boop",
    "icon": "textformat.123",
    "tags": "count,words,characters,lines,statistics"
  }
**/

function main(state) {
  var text = state.text;
  
  var chars = text.length;
  var charsNoSpaces = text.replace(/\s/g, "").length;
  var words = text.trim().split(/\s+/).filter(function(w) { return w.length > 0; }).length;
  var lines = text.split("\n").length;
  var paragraphs = text.split(/\n\s*\n/).filter(function(p) { return p.trim().length > 0; }).length;
  var sentences = (text.match(/[.!?]+/g) || []).length;
  
  state.text = "Characters: " + chars + "\n" +
               "Characters (no spaces): " + charsNoSpaces + "\n" +
               "Words: " + words + "\n" +
               "Lines: " + lines + "\n" +
               "Paragraphs: " + paragraphs + "\n" +
               "Sentences: " + sentences;
  
  state.postInfo(words + " words, " + chars + " characters");
}

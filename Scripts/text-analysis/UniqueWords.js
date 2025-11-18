/**
  {
    "api": 1,
    "name": "Unique Word Count",
    "description": "Counts unique words in text",
    "author": "Boop",
    "icon": "sparkles",
    "tags": "unique,words,count,statistics"
  }
**/

function main(state) {
  const words = state.text.toLowerCase().match(/\b\w+\b/g) || [];
  const unique = new Set(words);
  state.text = `Total words: ${words.length}\nUnique words: ${unique.size}`;
}

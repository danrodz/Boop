/**
  {
    "api": 1,
    "name": "Pig Latin",
    "description": "Converts text to Pig Latin",
    "author": "Boop",
    "icon": "text.bubble",
    "tags": "pig,latin,language,game"
  }
**/

function toPigLatin(word) {
  if (word.length === 0) return word;

  const vowels = 'aeiouAEIOU';
  if (vowels.includes(word[0])) {
    return word + 'way';
  }

  let i = 0;
  while (i < word.length && !vowels.includes(word[i])) {
    i++;
  }

  if (i === word.length) return word + 'ay';

  return word.slice(i) + word.slice(0, i) + 'ay';
}

function main(state) {
  const words = state.text.split(/(\s+)/);
  const result = words.map(word => {
    if (/\s/.test(word)) return word;
    return toPigLatin(word);
  }).join('');
  state.text = result;
}

/**
  {
    "api": 1,
    "name": "Pig Latin Translator",
    "description": "Translate text to Pig Latin",
    "author": "Boop",
    "icon": "character.bubble",
    "tags": "piglatin,translate,fun,text"
  }
**/

function main(state) {
  try {
    const text = state.text;

    function toPigLatin(word) {
      const vowels = 'aeiouAEIOU';

      // Handle punctuation
      const match = word.match(/^([a-zA-Z]+)(.*)$/);
      if (!match) return word;

      const letters = match[1];
      const punctuation = match[2];

      // Check if starts with vowel
      if (vowels.includes(letters[0])) {
        return letters + 'way' + punctuation;
      }

      // Find first vowel
      let firstVowel = 0;
      for (let i = 0; i < letters.length; i++) {
        if (vowels.includes(letters[i])) {
          firstVowel = i;
          break;
        }
      }

      if (firstVowel === 0) {
        return letters + 'way' + punctuation;
      }

      const beginning = letters.slice(0, firstVowel);
      const rest = letters.slice(firstVowel);

      return rest + beginning + 'ay' + punctuation;
    }

    const words = text.split(/\s+/);
    const translated = words.map(toPigLatin).join(' ');

    state.text = translated;
  } catch (error) {
    state.postError("Error translating to Pig Latin: " + error.message);
  }
}

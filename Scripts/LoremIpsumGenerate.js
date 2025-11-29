/**
  {
    "api": 1,
    "name": "Generate Lorem Ipsum",
    "description": "Generates realistic Lorem Ipsum text (paragraphs/words)",
    "author": "Boop",
    "icon": "text.alignleft",
    "tags": "lorem,ipsum,generate,placeholder,text"
  }
**/

function main(state) {
  const words = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
    'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
    'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
    'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
    'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
    'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
    'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
    'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
  ];

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function generateSentence() {
    const length = Math.floor(Math.random() * 10) + 8; // 8-17 words
    const sentence = [];

    for (let i = 0; i < length; i++) {
      sentence.push(words[Math.floor(Math.random() * words.length)]);
    }

    return capitalize(sentence.join(' ')) + '.';
  }

  function generateParagraph() {
    const sentences = Math.floor(Math.random() * 4) + 4; // 4-7 sentences
    const paragraph = [];

    for (let i = 0; i < sentences; i++) {
      paragraph.push(generateSentence());
    }

    return paragraph.join(' ');
  }

  // Parse input for count
  const input = state.text.trim().toLowerCase();
  let count = 3; // default paragraphs

  if (input.match(/^\d+$/)) {
    count = parseInt(input);
  } else if (input.includes('word')) {
    const match = input.match(/(\d+)/);
    count = match ? parseInt(match[1]) : 50;
    const wordList = [];
    for (let i = 0; i < count; i++) {
      wordList.push(words[Math.floor(Math.random() * words.length)]);
    }
    state.text = capitalize(wordList.join(' ')) + '.';
    return;
  }

  const paragraphs = [];
  for (let i = 0; i < Math.min(count, 20); i++) {
    paragraphs.push(generateParagraph());
  }

  state.text = paragraphs.join('\n\n');
}

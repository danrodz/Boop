/**
  {
    "api": 1,
    "name": "Emoji to Text",
    "description": "Convert emoji to text descriptions",
    "author": "Boop",
    "icon": "smile",
    "tags": "emoji,text,convert,unicode"
  }
**/

function main(state) {
  const emojiMap = {
    '😀': ':grinning:',
    '😃': ':smiley:',
    '😄': ':smile:',
    '😁': ':grin:',
    '😊': ':blush:',
    '😍': ':heart_eyes:',
    '🤔': ':thinking:',
    '😂': ':joy:',
    '😭': ':sob:',
    '😡': ':rage:',
    '👍': ':thumbsup:',
    '👎': ':thumbsdown:',
    '❤️': ':heart:',
    '💔': ':broken_heart:',
    '🔥': ':fire:',
    '✨': ':sparkles:',
    '🎉': ':tada:',
    '🚀': ':rocket:',
    '✅': ':white_check_mark:',
    '❌': ':x:',
    '⚠️': ':warning:',
    '💡': ':bulb:',
    '📝': ':memo:',
    '🎯': ':dart:'
  };

  let result = state.text;

  for (const [emoji, text] of Object.entries(emojiMap)) {
    result = result.replace(new RegExp(emoji, 'g'), text);
  }

  if (result === state.text) {
    state.postInfo("No known emoji found to convert");
  } else {
    state.text = result;
    state.postInfo("Converted emoji to text");
  }
}

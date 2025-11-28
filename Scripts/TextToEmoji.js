/**
  {
    "api": 1,
    "name": "Text to Emoji",
    "description": "Convert text descriptions to emoji",
    "author": "Boop",
    "icon": "smile",
    "tags": "emoji,text,convert,unicode"
  }
**/

function main(state) {
  const textMap = {
    ':grinning:': '😀',
    ':smiley:': '😃',
    ':smile:': '😄',
    ':grin:': '😁',
    ':blush:': '😊',
    ':heart_eyes:': '😍',
    ':thinking:': '🤔',
    ':joy:': '😂',
    ':sob:': '😭',
    ':rage:': '😡',
    ':thumbsup:': '👍',
    ':thumbsdown:': '👎',
    ':heart:': '❤️',
    ':broken_heart:': '💔',
    ':fire:': '🔥',
    ':sparkles:': '✨',
    ':tada:': '🎉',
    ':rocket:': '🚀',
    ':white_check_mark:': '✅',
    ':check:': '✅',
    ':x:': '❌',
    ':warning:': '⚠️',
    ':bulb:': '💡',
    ':memo:': '📝',
    ':dart:': '🎯'
  };

  let result = state.text;

  for (const [text, emoji] of Object.entries(textMap)) {
    result = result.replace(new RegExp(text, 'g'), emoji);
  }

  state.text = result;
  state.postInfo("Converted text to emoji");
}

/**
  {
    "api": 1,
    "name": "Text to Binary",
    "description": "Converts text to binary representation",
    "author": "Boop",
    "icon": "01.square",
    "tags": "binary,text,convert,encode,bits"
  }
**/

function main(state) {
  const binary = state.text
    .split('')
    .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
    .join(' ');
  
  state.text = binary;
  state.postInfo("Converted to binary");
}

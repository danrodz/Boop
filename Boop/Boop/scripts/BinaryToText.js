/**
{
  "api": 1,
  "name": "Binary to Text",
  "description": "Converts binary (8-bit) to text",
  "author": "Boop",
  "icon": "01.circle",
  "tags": "binary,decode,text,ascii"
}
**/

function main(state) {
  const binary = state.text.replace(/\s/g, '');
  let text = '';

  for (let i = 0; i < binary.length; i += 8) {
    const byte = binary.substr(i, 8);
    text += String.fromCharCode(parseInt(byte, 2));
  }

  state.text = text;
}

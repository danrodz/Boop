/**
  {
    "api": 1,
    "name": "Binary to Text",
    "description": "Converts binary representation to text",
    "author": "Boop",
    "icon": "01.square",
    "tags": "binary,text,convert,decode,bits"
  }
**/

function main(state) {
  // Remove all whitespace and split into 8-bit chunks
  const clean = state.text.replace(/\s/g, '');
  
  if (!/^[01]+$/.test(clean)) {
    state.postError("Invalid binary: must contain only 0s and 1s");
    return;
  }
  
  if (clean.length % 8 !== 0) {
    state.postError("Invalid binary: length must be multiple of 8");
    return;
  }
  
  let text = '';
  for (let i = 0; i < clean.length; i += 8) {
    const byte = clean.substr(i, 8);
    text += String.fromCharCode(parseInt(byte, 2));
  }
  
  state.text = text;
  state.postInfo("Converted to text");
}

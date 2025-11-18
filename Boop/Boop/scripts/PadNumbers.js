/**
{
  "api": 1,
  "name": "Pad Numbers with Zeros",
  "description": "Pads numbers to 3 digits with leading zeros",
  "author": "Boop",
  "icon": "number",
  "tags": "pad,zero,numbers,format"
}
**/

function main(state) {
  state.text = state.text.replace(/\b\d+\b/g, match => {
    return match.padStart(3, '0');
  });
}

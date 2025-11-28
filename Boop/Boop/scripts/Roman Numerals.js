/**
{
  "api": 1,
  "name": "Roman Numeral List",
  "description": "Numbers lines with Roman numerals",
  "author": "Boop",
  "icon": "textformat",
  "tags": "roman,number,list"
}
**/

function main(state) {
  const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X',
                         'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX'];
  const lines = state.text.split('\n');
  const enumerated = lines.map((line, i) => {
    const num = romanNumerals[i] || String(i + 1);
    return num + '. ' + line;
  });
  state.text = enumerated.join('\n');
}

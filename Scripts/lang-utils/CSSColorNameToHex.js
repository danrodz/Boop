/**
  {
    "api": 1,
    "name": "CSS: Common Color to Hex",
    "description": "Converts common color names",
    "author": "Boop",
    "icon": "curlybraces",
    "tags": "programming,code,language,format,escape"
  }
**/

function main(state) {
  const colors = {
    red: '#FF0000', blue: '#0000FF', green: '#008000',
    yellow: '#FFFF00', orange: '#FFA500', purple: '#800080',
    pink: '#FFC0CB', brown: '#A52A2A', black: '#000000', white: '#FFFFFF'
  };
  const color = state.text.toLowerCase().trim();
  state.text = colors[color] || state.text;
}

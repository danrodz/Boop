/**
  {
    "api": 1,
    "name": "Percent Encode",
    "description": "Percent-encodes all characters (URL encoding variant)",
    "author": "Boop",
    "icon": "percent",
    "tags": "percent,encode,url"
  }
**/

function main(state) {
  const encoded = state.text.split('').map(char => {
    return '%' + char.charCodeAt(0).toString(16).toUpperCase().padStart(2, '0');
  }).join('');
  state.text = encoded;
}

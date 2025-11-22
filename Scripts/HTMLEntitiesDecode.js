/**
  {
    "api": 1,
    "name": "HTML Entities Decode",
    "description": "Decodes HTML entities to characters",
    "author": "Boop",
    "icon": "chevron.left.slash.chevron.right",
    "tags": "html,entities,decode,unescape,special"
  }
**/

function main(state) {
  const entities = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&apos;': "'",
    '&nbsp;': ' ',
    '&copy;': '©',
    '&reg;': '®',
    '&trade;': '™',
    '&euro;': '€',
    '&pound;': '£',
    '&yen;': '¥',
    '&mdash;': '—',
    '&ndash;': '–',
    '&hellip;': '…',
    '&deg;': '°',
    '&plusmn;': '±',
    '&times;': '×',
    '&divide;': '÷'
  };
  
  let result = state.text;
  for (const [entity, char] of Object.entries(entities)) {
    result = result.split(entity).join(char);
  }
  
  // Handle numeric entities
  result = result.replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code)));
  result = result.replace(/&#x([0-9a-fA-F]+);/g, (_, code) => String.fromCharCode(parseInt(code, 16)));
  
  state.text = result;
  state.postInfo("HTML entities decoded");
}

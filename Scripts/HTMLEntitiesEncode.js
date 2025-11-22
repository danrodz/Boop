/**
  {
    "api": 1,
    "name": "HTML Entities Encode",
    "description": "Encodes special characters to HTML entities",
    "author": "Boop",
    "icon": "chevron.left.slash.chevron.right",
    "tags": "html,entities,encode,escape,special"
  }
**/

function main(state) {
  const entities = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '©': '&copy;',
    '®': '&reg;',
    '™': '&trade;',
    '€': '&euro;',
    '£': '&pound;',
    '¥': '&yen;',
    '—': '&mdash;',
    '–': '&ndash;',
    '…': '&hellip;',
    '°': '&deg;',
    '±': '&plusmn;',
    '×': '&times;',
    '÷': '&divide;'
  };
  
  let result = state.text;
  for (const [char, entity] of Object.entries(entities)) {
    result = result.split(char).join(entity);
  }
  state.text = result;
  state.postInfo("HTML entities encoded");
}

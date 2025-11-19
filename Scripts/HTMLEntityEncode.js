/**
  {
    "api": 1,
    "name": "HTML Entity Encode",
    "description": "Encodes HTML entities (comprehensive)",
    "author": "Boop",
    "icon": "chevron.left.forwardslash.chevron.right",
    "tags": "html,encode,entities,escape"
  }
**/

function main(state) {
  const entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;'
  };

  const result = state.text.replace(/[&<>"'`=\/]/g, char => entityMap[char]);
  state.text = result;
}

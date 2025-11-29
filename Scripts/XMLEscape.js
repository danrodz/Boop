/**
  {
    "api": 1,
    "name": "XML Escape",
    "description": "Escapes special XML characters",
    "author": "Boop",
    "icon": "chevron.left.slash.chevron.right",
    "tags": "xml,escape,entities,encode,html"
  }
**/

function main(state) {
  const entities = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&apos;'
  };
  
  state.text = state.text.replace(/[&<>"']/g, char => entities[char]);
  state.postInfo("XML characters escaped");
}

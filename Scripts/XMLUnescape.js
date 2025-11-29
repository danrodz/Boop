/**
  {
    "api": 1,
    "name": "XML Unescape",
    "description": "Unescapes XML entities to characters",
    "author": "Boop",
    "icon": "chevron.left.slash.chevron.right",
    "tags": "xml,unescape,entities,decode,html"
  }
**/

function main(state) {
  const entities = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&apos;': "'"
  };
  
  state.text = state.text.replace(/&(amp|lt|gt|quot|apos);/g, match => entities[match]);
  state.postInfo("XML entities unescaped");
}

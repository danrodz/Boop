/**
  {
    "api": 1,
    "name": "HTML Unescape",
    "description": "Unescapes HTML entities",
    "author": "Boop",
    "icon": "curlybraces",
    "tags": "programming,code,language,format,escape"
  }
**/

function main(state) {
  const unescaped = state.text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
  state.text = unescaped;
}

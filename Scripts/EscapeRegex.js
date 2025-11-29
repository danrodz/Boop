/**
  {
    "api": 1,
    "name": "Escape Regex",
    "description": "Escapes special regex characters",
    "author": "Boop",
    "icon": "magnifyingglass.circle.fill",
    "tags": "regex,escape,special,characters"
  }
**/

function main(state) {
  const escaped = state.text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  state.text = escaped;
}

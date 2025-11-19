/**
  {
    "api": 1,
    "name": "Check if Well-Known Port",
    "description": "Checks if port is well-known (0-1023)",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,format,convert"
  }
**/

function main(state) {
  const port = parseInt(state.text.trim());
  const isWellKnown = port >= 0 && port <= 1023;
  state.text = isWellKnown ? 'Well-known port (0-1023)' : 'Not a well-known port';
}

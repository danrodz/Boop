/**
{
  "api": 1,
  "name": "Split by Comma",
  "description": "Splits comma-separated values to lines",
  "author": "Boop",
  "icon": "line.horizontal.3",
  "tags": "split,comma,csv,lines"
}
**/

function main(state) {
  const items = state.text.split(',').map(s => s.trim());
  state.text = items.join('\n');
}

/**
  {
    "api": 1,
    "name": "Split to Lines (Comma)",
    "description": "Splits comma-separated values to lines",
    "author": "Boop",
    "icon": "arrow.down.to.line",
    "tags": "split,lines,comma,csv"
  }
**/

function main(state) {
  state.text = state.text.split(',').map(s => s.trim()).join('\n');
}

/**
  {
    "api": 1,
    "name": "Average Word Length",
    "description": "Calculates average word length",
    "author": "Boop",
    "icon": "textformat.size",
    "tags": "average,word,length,statistics"
  }
**/

function main(state) {
  const words = state.text.trim().split(/\s+/).filter(w => w.length > 0);
  const totalLength = words.reduce((sum, word) => sum + word.length, 0);
  const avg = (totalLength / words.length).toFixed(2);
  state.text = `Average word length: ${avg} characters`;
}

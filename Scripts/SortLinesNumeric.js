/**
  {
    "api": 1,
    "name": "Sort Lines Numerically",
    "description": "Sorts lines by leading number",
    "author": "Boop",
    "icon": "sort",
    "tags": "sort,lines,numeric,number,order"
  }
**/

function main(state) {
  const lines = state.text.split('\n');
  lines.sort((a, b) => {
    const numA = parseFloat(a.match(/^-?\d+\.?\d*/)?.[0] || '0');
    const numB = parseFloat(b.match(/^-?\d+\.?\d*/)?.[0] || '0');
    return numA - numB;
  });
  state.text = lines.join('\n');
  state.postInfo(`Sorted ${lines.length} lines numerically`);
}

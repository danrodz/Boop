/**
  {
    "api": 1,
    "name": "Markdown Table to CSV",
    "description": "Converts Markdown table to CSV format",
    "author": "Boop",
    "icon": "tablecells",
    "tags": "markdown,csv,table,convert"
  }
**/

function markdownTableToCSV(md) {
  const lines = md.trim().split('\n').filter(l => l.trim());
  let csv = '';

  for (let line of lines) {
    // Skip separator lines
    if (/^\|[\s-:|]+\|$/.test(line)) continue;

    // Extract cells
    const cells = line.split('|')
      .slice(1, -1)  // Remove first and last empty elements
      .map(c => c.trim());

    csv += cells.join(',') + '\n';
  }

  return csv.trim();
}

function main(state) {
  state.text = markdownTableToCSV(state.text);
}

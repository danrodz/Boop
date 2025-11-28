/**
  {
    "api": 1,
    "name": "Markdown Table to CSV",
    "description": "Convert Markdown table to CSV format",
    "author": "Boop",
    "icon": "table",
    "tags": "markdown,csv,table,convert"
  }
**/

function main(state) {
  const lines = state.text.trim().split('\n').filter(line => line.trim());

  const csv = lines
    .filter(line => !line.match(/^\|[\s-:|]+\|$/)) // Skip separator line
    .map(line => {
      // Remove leading/trailing pipes and split
      return line.replace(/^\||\|$/g, '')
        .split('|')
        .map(cell => cell.trim())
        .join(',');
    })
    .join('\n');

  state.text = csv;
  state.postInfo("Converted to CSV");
}

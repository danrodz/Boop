/**
  {
    "api": 1,
    "name": "CSV to Markdown Table",
    "description": "Converts CSV to Markdown table format",
    "author": "Boop",
    "icon": "tablecells",
    "tags": "csv,markdown,table,convert"
  }
**/

function csvToMarkdownTable(csv) {
  const lines = csv.trim().split('\n');
  if (lines.length === 0) return '';

  let md = '';
  const headers = lines[0].split(',').map(h => h.trim());

  // Header row
  md += '| ' + headers.join(' | ') + ' |\n';

  // Separator row
  md += '| ' + headers.map(() => '---').join(' | ') + ' |\n';

  // Data rows
  for (let i = 1; i < lines.length; i++) {
    const cells = lines[i].split(',').map(c => c.trim());
    md += '| ' + cells.join(' | ') + ' |\n';
  }

  return md;
}

function main(state) {
  state.text = csvToMarkdownTable(state.text);
}

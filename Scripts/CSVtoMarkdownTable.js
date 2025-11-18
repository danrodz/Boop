/**
  {
    "api": 1,
    "name": "CSV to Markdown Table",
    "description": "Convert CSV to Markdown table format",
    "author": "Boop",
    "icon": "table",
    "tags": "csv,markdown,table,convert"
  }
**/

function main(state) {
  const lines = state.text.trim().split('\n');
  if (lines.length === 0) {
    state.postError("Empty CSV");
    return;
  }

  const rows = lines.map(line => line.split(',').map(cell => cell.trim()));

  // Header
  let markdown = '| ' + rows[0].join(' | ') + ' |\n';

  // Separator
  markdown += '| ' + rows[0].map(() => '---').join(' | ') + ' |\n';

  // Data rows
  for (let i = 1; i < rows.length; i++) {
    markdown += '| ' + rows[i].join(' | ') + ' |\n';
  }

  state.text = markdown;
  state.postInfo("Converted to Markdown table");
}

/**
{
  "api": 1,
  "name": "CSV to Markdown Table",
  "description": "Converts CSV to Markdown table",
  "author": "Boop",
  "icon": "table",
  "tags": "csv,table,markdown"
}
**/

function main(state) {
  const lines = state.text.split('\n').filter(l => l.trim());
  if (lines.length === 0) return;

  const rows = lines.map(line => line.split(',').map(cell => cell.trim()));
  let result = '| ' + rows[0].join(' | ') + ' |\n';
  result += '| ' + rows[0].map(() => '---').join(' | ') + ' |\n';

  for (let i = 1; i < rows.length; i++) {
    result += '| ' + rows[i].join(' | ') + ' |\n';
  }

  state.text = result;
}

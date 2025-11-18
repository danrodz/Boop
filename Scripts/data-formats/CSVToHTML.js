/**
  {
    "api": 1,
    "name": "CSV to HTML Table",
    "description": "Converts CSV to HTML table",
    "author": "Boop",
    "icon": "tablecells",
    "tags": "csv,html,table,convert,transform"
  }
**/

function csvToHtml(csv) {
  const lines = csv.trim().split('\n');
  let html = '<table>\n';

  for (let i = 0; i < lines.length; i++) {
    const cells = lines[i].split(',').map(c => c.trim());
    const tag = i === 0 ? 'th' : 'td';
    html += '  <tr>\n';
    for (let cell of cells) {
      html += `    <${tag}>${cell}</${tag}>\n`;
    }
    html += '  </tr>\n';
  }

  html += '</table>';
  return html;
}

function main(state) {
  state.text = csvToHtml(state.text);
}

/**
{
  "api": 1,
  "name": "TSV to CSV",
  "description": "Converts Tab-Separated Values to CSV",
  "author": "Boop",
  "icon": "arrow.left.arrow.right",
  "tags": "tsv,csv,convert,tabs"
}
**/

function main(state) {
  const lines = state.text.split('\n');
  const csvLines = lines.map(line => {
    const fields = line.split('\t');
    return fields.map(field => `"${field.replace(/"/g, '""')}"`).join(',');
  });

  state.text = csvLines.join('\n');
}

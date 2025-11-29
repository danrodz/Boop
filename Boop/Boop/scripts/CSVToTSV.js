/**
{
  "api": 1,
  "name": "CSV to TSV",
  "description": "Converts CSV to Tab-Separated Values",
  "author": "Boop",
  "icon": "arrow.left.arrow.right",
  "tags": "csv,tsv,convert,tabs"
}
**/

function main(state) {
  const lines = state.text.split('\n');
  const tsvLines = lines.map(line => {
    const fields = line.match(/(".*?"|[^,]+)(?=\s*,|\s*$)/g) || [];
    return fields.map(field => field.replace(/^"|"$/g, '').replace(/""/g, '"')).join('\t');
  });

  state.text = tsvLines.join('\n');
}

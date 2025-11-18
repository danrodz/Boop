/**
  {
    "api": 1,
    "name": "SQL Result to JSON",
    "description": "Convert SQL table result to JSON array",
    "author": "Boop",
    "icon": "table",
    "tags": "sql,json,table,convert,database"
  }
**/

function main(state) {
  const lines = state.text.trim().split('\n').filter(l => l.trim());

  if (lines.length < 3) {
    state.postError("Need at least header and separator rows");
    return;
  }

  // Parse header (first line with | separators)
  const headers = lines[0].split('|')
    .map(h => h.trim())
    .filter(h => h);

  // Skip separator line (usually second line with +---+)
  const startIndex = lines[1].includes('---') ? 2 : 1;

  // Parse data rows
  const data = [];
  for (let i = startIndex; i < lines.length; i++) {
    if (lines[i].includes('---')) continue;

    const values = lines[i].split('|')
      .map(v => v.trim())
      .filter((v, idx) => idx < headers.length || idx > 0);

    if (values.length === headers.length) {
      const row = {};
      headers.forEach((header, idx) => {
        row[header] = values[idx];
      });
      data.push(row);
    }
  }

  state.text = JSON.stringify(data, null, 2);
  state.postInfo("Converted SQL result to JSON");
}

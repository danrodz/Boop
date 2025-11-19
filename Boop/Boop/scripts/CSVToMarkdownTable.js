/**
  {
    "api": 1,
    "name": "CSV to Markdown Table",
    "description": "Convert CSV to Markdown table format",
    "author": "Boop",
    "icon": "tablecells",
    "tags": "csv,markdown,table,convert"
  }
**/

function main(state) {
  try {
    const lines = state.text.trim().split('\n');

    if (lines.length === 0) {
      state.postError("No data found");
      return;
    }

    const rows = lines.map(line => {
      // Handle quoted fields
      const fields = [];
      let current = '';
      let inQuotes = false;

      for (let i = 0; i < line.length; i++) {
        const char = line[i];

        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          fields.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }
      fields.push(current.trim());

      return fields;
    });

    // Create header
    const header = '| ' + rows[0].join(' | ') + ' |';
    const separator = '| ' + rows[0].map(() => '---').join(' | ') + ' |';

    // Create rows
    const dataRows = rows.slice(1).map(row =>
      '| ' + row.join(' | ') + ' |'
    );

    const result = [header, separator, ...dataRows].join('\n');
    state.text = result;
  } catch (error) {
    state.postError("Error converting CSV: " + error.message);
  }
}

/**
  {
    "api": 1,
    "name": "CSV to JSON Array",
    "description": "Converts CSV to JSON array with proper type inference",
    "author": "Boop",
    "icon": "tablecells.fill",
    "tags": "csv,json,convert,parse,table"
  }
**/

function main(state) {
  try {
    const lines = state.text.trim().split('\n');

    if (lines.length < 2) {
      state.postError("CSV must have at least header and one data row");
      return;
    }

    // Parse CSV line handling quoted values
    function parseLine(line) {
      const result = [];
      let current = '';
      let inQuotes = false;

      for (let i = 0; i < line.length; i++) {
        const char = line[i];

        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          result.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }
      result.push(current.trim());

      return result;
    }

    // Infer type of value
    function inferType(value) {
      if (value === '') return null;
      if (value === 'true') return true;
      if (value === 'false') return false;
      if (!isNaN(value) && value !== '') return Number(value);
      return value.replace(/^"|"$/g, ''); // Remove quotes
    }

    const headers = parseLine(lines[0]);
    const data = [];

    for (let i = 1; i < lines.length; i++) {
      const values = parseLine(lines[i]);
      const obj = {};

      headers.forEach((header, index) => {
        obj[header] = inferType(values[index] || '');
      });

      data.push(obj);
    }

    state.text = JSON.stringify(data, null, 2);
  } catch (error) {
    state.postError("Failed to convert CSV: " + error.message);
  }
}

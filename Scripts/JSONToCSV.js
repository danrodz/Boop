/**
  {
    "api": 1,
    "name": "JSON to CSV",
    "description": "Converts JSON array to CSV with proper escaping",
    "author": "Boop",
    "icon": "tablecells.fill",
    "tags": "json,csv,convert,export,table"
  }
**/

function main(state) {
  try {
    const data = JSON.parse(state.text);

    if (!Array.isArray(data) || data.length === 0) {
      state.postError("Input must be a non-empty JSON array");
      return;
    }

    // Get all unique keys from all objects
    const keys = [...new Set(data.flatMap(obj => Object.keys(obj)))];

    // Escape CSV value
    function escapeCSV(value) {
      if (value === null || value === undefined) return '';

      const str = String(value);

      // If contains comma, quote, or newline, wrap in quotes and escape quotes
      if (str.includes(',') || str.includes('"') || str.includes('\n')) {
        return '"' + str.replace(/"/g, '""') + '"';
      }

      return str;
    }

    // Build CSV
    const csv = [];

    // Header row
    csv.push(keys.map(escapeCSV).join(','));

    // Data rows
    for (const obj of data) {
      const row = keys.map(key => escapeCSV(obj[key]));
      csv.push(row.join(','));
    }

    state.text = csv.join('\n');
  } catch (error) {
    state.postError("Failed to convert JSON: " + error.message);
  }
}

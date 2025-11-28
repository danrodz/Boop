/**
  {
    "api": 1,
    "name": "Markdown Table Generator",
    "description": "Convert CSV to Markdown table",
    "author": "Boop",
    "icon": "tablecells",
    "tags": "markdown,table,csv,convert"
  }
**/

function main(state) {
  try {
    const lines = state.text.trim().split('\n');

    if (lines.length < 2) {
      state.postError("Need at least header and one data row");
      return;
    }

    // Parse CSV
    const rows = lines.map(line =>
      line.split(',').map(cell => cell.trim())
    );

    // Calculate column widths
    const widths = rows[0].map((_, colIndex) =>
      Math.max(...rows.map(row => (row[colIndex] || '').length))
    );

    // Build Markdown table
    let result = '| ';
    result += rows[0].map((cell, i) => cell.padEnd(widths[i])).join(' | ');
    result += ' |\n';

    // Separator row
    result += '| ';
    result += widths.map(w => '-'.repeat(w)).join(' | ');
    result += ' |\n';

    // Data rows
    for (let i = 1; i < rows.length; i++) {
      result += '| ';
      result += rows[i].map((cell, j) => (cell || '').padEnd(widths[j])).join(' | ');
      result += ' |\n';
    }

    state.text = result.trim();
  } catch (error) {
    state.postError("Failed to generate table: " + error.message);
  }
}

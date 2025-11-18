/**
  {
    "api": 1,
    "name": "Align to Columns (Pipe)",
    "description": "Aligns text into columns separated by pipes",
    "author": "Boop",
    "icon": "columns",
    "tags": "align,columns,format,pipe,table"
  }
**/

function main(state) {
  try {
    const lines = state.text.split("\n");
    const rows = lines.map(line => line.split('|').map(cell => cell.trim()));

    // Find max width for each column
    const maxWidths = [];
    rows.forEach(row => {
      row.forEach((cell, i) => {
        maxWidths[i] = Math.max(maxWidths[i] || 0, cell.length);
      });
    });

    // Pad each cell to max width
    state.text = rows.map(row => {
      return row.map((cell, i) => {
        return cell.padEnd(maxWidths[i], ' ');
      }).join(' | ');
    }).join("\n");
  } catch (error) {
    state.postError("Failed to align to columns");
  }
}

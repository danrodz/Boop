/**
  {
    "api": 1,
    "name": "Transpose Lines (Rows ↔ Columns)",
    "description": "Transposes space-separated or tab-separated data (rows become columns)",
    "author": "Boop",
    "icon": "swap",
    "tags": "transpose,pivot,rotate,matrix,swap"
  }
**/

function main(state) {
  try {
    const lines = state.text.split("\n").filter(line => line.trim().length > 0);

    if (lines.length === 0) {
      state.postError("No content to transpose");
      return;
    }

    // Detect delimiter (tab or space)
    const firstLine = lines[0];
    const delimiter = firstLine.includes('\t') ? '\t' : /\s+/;

    // Parse into 2D array
    const rows = lines.map(line => line.split(delimiter).filter(cell => cell.length > 0));

    // Find max columns
    const maxCols = Math.max(...rows.map(row => row.length));

    // Transpose
    const transposed = [];
    for (let col = 0; col < maxCols; col++) {
      const newRow = [];
      for (let row = 0; row < rows.length; row++) {
        newRow.push(rows[row][col] || '');
      }
      transposed.push(newRow.join('\t'));
    }

    state.text = transposed.join("\n");
  } catch (error) {
    state.postError("Failed to transpose: " + error.message);
  }
}

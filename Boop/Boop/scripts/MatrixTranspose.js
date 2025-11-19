/**
  {
    "api": 1,
    "name": "Matrix Transpose",
    "description": "Transpose a matrix (rows become columns)",
    "author": "Boop",
    "icon": "arrow.up.left.and.arrow.down.right",
    "tags": "matrix,transpose,math,linear algebra"
  }
**/

function main(state) {
  try {
    const lines = state.text.trim().split('\n');
    const matrix = lines.map(line =>
      line.trim().split(/[\s,]+/).map(n => parseFloat(n))
    );

    // Validate matrix
    const cols = matrix[0].length;
    for (const row of matrix) {
      if (row.length !== cols) {
        state.postError("Matrix rows must have equal length");
        return;
      }
      if (row.some(n => isNaN(n))) {
        state.postError("Matrix contains invalid numbers");
        return;
      }
    }

    // Transpose
    const transposed = [];
    for (let col = 0; col < cols; col++) {
      const newRow = [];
      for (let row = 0; row < matrix.length; row++) {
        newRow.push(matrix[row][col]);
      }
      transposed.push(newRow);
    }

    // Format output
    const result = transposed.map(row => row.join('\t')).join('\n');
    state.text = result;
    state.postInfo(`Transposed ${matrix.length}x${cols} matrix to ${cols}x${matrix.length}`);
  } catch (error) {
    state.postError("Error transposing matrix: " + error.message);
  }
}

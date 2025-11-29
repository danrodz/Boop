/**
  {
    "api": 1,
    "name": "SQL Explain Formatter",
    "description": "Format SQL EXPLAIN output for readability",
    "author": "Boop",
    "icon": "doc.text.magnifyingglass",
    "tags": "sql,explain,performance,format,analyze"
  }
**/

function main(state) {
  try {
    const lines = state.text.trim().split('\n');
    const result = ['SQL EXPLAIN Analysis:', ''];

    let totalRows = 0;
    const issues = [];

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;

      // Look for common EXPLAIN patterns
      if (trimmed.toLowerCase().includes('full table scan') || trimmed.toLowerCase().includes('type: all')) {
        issues.push('⚠️  Full table scan detected - consider adding index');
      }

      if (trimmed.toLowerCase().includes('using filesort')) {
        issues.push('⚠️  Using filesort - consider optimizing ORDER BY');
      }

      if (trimmed.toLowerCase().includes('using temporary')) {
        issues.push('⚠️  Using temporary table - may impact performance');
      }

      const rowsMatch = trimmed.match(/rows[:\s]+(\d+)/i);
      if (rowsMatch) {
        totalRows += parseInt(rowsMatch[1]);
      }

      result.push(trimmed);
    }

    result.push('');
    result.push('Analysis:');
    result.push(`Total estimated rows: ${totalRows.toLocaleString()}`);
    result.push('');

    if (issues.length > 0) {
      result.push('Performance Issues:');
      result.push(...issues);
    } else {
      result.push('✓ No major performance issues detected');
    }

    state.text = result.join('\n');
  } catch (error) {
    state.postError("Error formatting EXPLAIN: " + error.message);
  }
}

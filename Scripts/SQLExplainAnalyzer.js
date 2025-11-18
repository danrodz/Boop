/**
  {
    "api": 1,
    "name": "SQL EXPLAIN Analyzer",
    "description": "Analyze SQL EXPLAIN output for performance insights",
    "author": "Boop",
    "icon": "speedometer",
    "tags": "sql,explain,performance,analyze"
  }
**/

function main(state) {
  try {
    const explain = state.text.toLowerCase();
    const warnings = [];
    const suggestions = [];

    // Check for common performance issues
    if (explain.includes('full table scan') || explain.includes('type: all')) {
      warnings.push('⚠️  FULL TABLE SCAN detected - Consider adding an index');
    }

    if (explain.includes('using filesort')) {
      warnings.push('⚠️  Using filesort - Consider adding an index for ORDER BY');
    }

    if (explain.includes('using temporary')) {
      warnings.push('⚠️  Using temporary table - May impact performance');
    }

    if (!explain.includes('using index')) {
      suggestions.push('💡 No index usage detected - Review indexing strategy');
    }

    if (explain.includes('type: ref') || explain.includes('type: eq_ref')) {
      suggestions.push('✓ Good index usage (ref/eq_ref)');
    }

    if (explain.includes('type: const')) {
      suggestions.push('✓ Excellent - Using constant lookup');
    }

    // Check row counts
    const rowMatch = explain.match(/rows:\s*(\d+)/i);
    if (rowMatch && parseInt(rowMatch[1]) > 10000) {
      warnings.push(`⚠️  Large row scan: ${rowMatch[1]} rows`);
    }

    let result = '=== SQL EXPLAIN ANALYSIS ===\n\n';

    if (warnings.length > 0) {
      result += 'WARNINGS:\n';
      result += warnings.join('\n') + '\n\n';
    }

    if (suggestions.length > 0) {
      result += 'SUGGESTIONS:\n';
      result += suggestions.join('\n') + '\n\n';
    }

    if (warnings.length === 0 && suggestions.length === 0) {
      result += 'No specific issues detected.\n';
      result += 'Review full EXPLAIN output for details.';
    }

    state.text = result;
  } catch (error) {
    state.postError("Failed to analyze: " + error.message);
  }
}

/**
  {
    "api": 1,
    "name": "Calculate Code Metrics",
    "description": "Calculate various code metrics (LOC, comments, etc.)",
    "author": "Boop",
    "icon": "info",
    "tags": "metrics,code-quality,analysis,statistics"
  }
**/

function main(state) {
  const code = state.text;
  const lines = code.split('\n');

  const metrics = {
    totalLines: lines.length,
    codeLines: 0,
    commentLines: 0,
    blankLines: 0,
    functions: 0,
    classes: 0
  };

  let inBlockComment = false;

  lines.forEach(line => {
    const trimmed = line.trim();

    // Blank lines
    if (trimmed === '') {
      metrics.blankLines++;
      return;
    }

    // Block comments
    if (trimmed.startsWith('/*')) {
      inBlockComment = true;
      metrics.commentLines++;
      if (trimmed.includes('*/')) {
        inBlockComment = false;
      }
      return;
    }

    if (inBlockComment) {
      metrics.commentLines++;
      if (trimmed.includes('*/')) {
        inBlockComment = false;
      }
      return;
    }

    // Single line comments
    if (trimmed.startsWith('//') || trimmed.startsWith('#')) {
      metrics.commentLines++;
      return;
    }

    // Code lines
    metrics.codeLines++;

    // Count functions
    if (/\bfunction\b/.test(line) || /=>\s*\{/.test(line)) {
      metrics.functions++;
    }

    // Count classes
    if (/\bclass\b/.test(line)) {
      metrics.classes++;
    }
  });

  const commentRatio = metrics.totalLines > 0
    ? ((metrics.commentLines / metrics.totalLines) * 100).toFixed(1)
    : 0;

  let output = `Code Metrics:\n\n`;
  output += `Total lines: ${metrics.totalLines}\n`;
  output += `Code lines: ${metrics.codeLines}\n`;
  output += `Comment lines: ${metrics.commentLines} (${commentRatio}%)\n`;
  output += `Blank lines: ${metrics.blankLines}\n`;
  output += `Functions: ${metrics.functions}\n`;
  output += `Classes: ${metrics.classes}\n\n`;

  output += `Comment ratio: ${commentRatio}% `;
  if (commentRatio < 10) output += '(Consider adding more comments)';
  else if (commentRatio > 30) output += '(Good documentation!)';

  state.text = output;
}

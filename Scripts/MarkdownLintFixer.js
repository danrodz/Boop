/**
  {
    "api": 1,
    "name": "Markdown Lint Fixer",
    "description": "Fix common markdown formatting issues",
    "author": "Boop",
    "icon": "wrench.and.screwdriver",
    "tags": "markdown,lint,fix,format"
  }
**/

function main(state) {
  try {
    let text = state.text;
    let fixes = [];

    // Fix: Add blank line before headers
    const beforeHeaders = text;
    text = text.replace(/([^\n])\n(#{1,6}\s+)/g, '$1\n\n$2');
    if (text !== beforeHeaders) fixes.push('Added blank lines before headers');

    // Fix: Add blank line after headers
    const beforeHeadersAfter = text;
    text = text.replace(/(#{1,6}\s+.+)\n([^#\n])/g, '$1\n\n$2');
    if (text !== beforeHeadersAfter) fixes.push('Added blank lines after headers');

    // Fix: Consistent list markers (use - instead of *)
    const beforeLists = text;
    text = text.replace(/^\*\s+/gm, '- ');
    if (text !== beforeLists) fixes.push('Standardized list markers to "-"');

    // Fix: Add space after list markers
    const beforeListSpaces = text;
    text = text.replace(/^(-|\d+\.)\s*([^\s])/gm, '$1 $2');
    if (text !== beforeListSpaces) fixes.push('Added spaces after list markers');

    // Fix: Remove trailing whitespace
    const beforeTrailing = text;
    text = text.replace(/[ \t]+$/gm, '');
    if (text !== beforeTrailing) fixes.push('Removed trailing whitespace');

    // Fix: Ensure single blank line at EOF
    text = text.replace(/\n*$/, '\n');

    // Fix: No multiple blank lines
    const beforeBlank = text;
    text = text.replace(/\n{3,}/g, '\n\n');
    if (text !== beforeBlank) fixes.push('Removed multiple consecutive blank lines');

    // Fix: Add space after # in headers
    const beforeHeaderSpace = text;
    text = text.replace(/^(#{1,6})([^\s#])/gm, '$1 $2');
    if (text !== beforeHeaderSpace) fixes.push('Added space after # in headers');

    let result = `=== FIXED MARKDOWN ===\n\n${text}\n\n`;
    result += `=== FIXES APPLIED ===\n`;

    if (fixes.length === 0) {
      result += '✓ No issues found';
    } else {
      fixes.forEach((fix, i) => {
        result += `${i + 1}. ${fix}\n`;
      });
    }

    state.text = result;
  } catch (error) {
    state.postError("Lint fix failed: " + error.message);
  }
}

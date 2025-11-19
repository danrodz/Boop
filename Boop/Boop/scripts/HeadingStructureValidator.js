/**
  {
    "api": 1,
    "name": "Heading Structure Validator",
    "description": "Validate HTML heading hierarchy (h1-h6)",
    "author": "Boop",
    "icon": "text.alignleft",
    "tags": "heading,h1,h2,accessibility,a11y,structure"
  }
**/

function main(state) {
  try {
    const html = state.text;
    const headingPattern = /<h([1-6])[^>]*>(.*?)<\/h\1>/gi;
    const headings = [];
    let match;

    while ((match = headingPattern.exec(html)) !== null) {
      headings.push({
        level: parseInt(match[1]),
        text: match[2].replace(/<[^>]+>/g, '').trim()
      });
    }

    if (headings.length === 0) {
      state.postError("No headings found in HTML");
      return;
    }

    const result = ['Heading Structure Analysis:', ''];
    const issues = [];

    // Check for h1
    const h1Count = headings.filter(h => h.level === 1).length;
    if (h1Count === 0) {
      issues.push('⚠️  No <h1> found - page should have exactly one h1');
    } else if (h1Count > 1) {
      issues.push(`⚠️  Multiple <h1> tags found (${h1Count}) - should have only one`);
    }

    // Check hierarchy
    let prevLevel = 0;
    headings.forEach((heading, i) => {
      const indent = '  '.repeat(heading.level - 1);
      result.push(`${indent}h${heading.level}: ${heading.text}`);

      if (heading.level - prevLevel > 1 && prevLevel !== 0) {
        issues.push(`⚠️  Skipped heading level from h${prevLevel} to h${heading.level}`);
      }

      prevLevel = heading.level;
    });

    result.push('');
    result.push(`Total headings: ${headings.length}`);
    result.push('');

    if (issues.length > 0) {
      result.push('Issues Found:');
      result.push(...issues);
    } else {
      result.push('✓ Heading structure is valid');
    }

    result.push('');
    result.push('Best Practices:');
    result.push('- Use exactly one h1 per page');
    result.push('- Don\'t skip heading levels');
    result.push('- Headings describe content structure');
    result.push('- Don\'t use headings for styling only');

    state.text = result.join('\n');
  } catch (error) {
    state.postError("Error validating headings: " + error.message);
  }
}

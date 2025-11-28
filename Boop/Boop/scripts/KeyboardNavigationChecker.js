/**
  {
    "api": 1,
    "name": "Keyboard Navigation Checker",
    "description": "Check HTML for keyboard accessibility issues",
    "author": "Boop",
    "icon": "keyboard",
    "tags": "keyboard,navigation,accessibility,a11y,tabindex"
  }
**/

function main(state) {
  try {
    const html = state.text;
    const issues = [];

    // Check for click handlers without keyboard handlers
    const clickPattern = /onclick=/gi;
    const clickCount = (html.match(clickPattern) || []).length;

    if (clickCount > 0) {
      issues.push(`⚠️  Found ${clickCount} onclick handler(s) - ensure keyboard equivalents`);
    }

    // Check for positive tabindex
    const tabindexPattern = /tabindex=["']([1-9]\d*)["']/gi;
    let tabMatch;
    let positiveTabindex = 0;

    while ((tabMatch = tabindexPattern.exec(html)) !== null) {
      positiveTabindex++;
    }

    if (positiveTabindex > 0) {
      issues.push(`❌ Found ${positiveTabindex} positive tabindex value(s) - use 0 or -1`);
    }

    // Check for divs/spans with click handlers
    const divClickPattern = /<(div|span)[^>]*onclick/gi;
    const divClickCount = (html.match(divClickPattern) || []).length;

    if (divClickCount > 0) {
      issues.push(`❌ Found ${divClickCount} div/span with onclick - use <button> instead`);
    }

    // Check for missing focus styles
    const hasFocusVisible = html.includes(':focus-visible') || html.includes(':focus');

    if (!hasFocusVisible && html.includes('<style>')) {
      issues.push('⚠️  No focus styles detected - ensure focus is visible');
    }

    // Check for links that look like buttons
    const linkButtonPattern = /<a[^>]*href=["']#["'][^>]*>/gi;
    const linkButtonCount = (html.match(linkButtonPattern) || []).length;

    if (linkButtonCount > 0) {
      issues.push(`⚠️  Found ${linkButtonCount} link(s) with href="#" - use <button> for actions`);
    }

    const result = ['Keyboard Navigation Analysis:', ''];

    if (issues.length === 0) {
      result.push('✓ No obvious keyboard navigation issues detected');
    } else {
      result.push('Issues Found:');
      result.push(...issues);
    }

    result.push('');
    result.push('Best Practices:');
    result.push('- All interactive elements must be keyboard accessible');
    result.push('- Use native HTML buttons and links');
    result.push('- Avoid positive tabindex values');
    result.push('- Ensure visible focus indicators');
    result.push('- Test with keyboard only navigation');
    result.push('- Support Tab, Enter, Space, Arrow keys');

    state.text = result.join('\n');
  } catch (error) {
    state.postError("Error checking keyboard navigation: " + error.message);
  }
}

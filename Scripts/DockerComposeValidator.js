/**
  {
    "api": 1,
    "name": "Docker Compose Validator",
    "description": "Validate docker-compose.yml syntax",
    "author": "Boop",
    "icon": "shippingbox",
    "tags": "docker,compose,validate,yaml"
  }
**/

function main(state) {
  try {
    const yaml = state.text;
    const errors = [];

    // Check for required fields
    if (!yaml.includes('version:')) {
      errors.push('Missing "version" field');
    }

    if (!yaml.includes('services:')) {
      errors.push('Missing "services" field');
    }

    // Check for common issues
    if (yaml.includes('image:') && yaml.includes('build:')) {
      // This is actually valid, just informational
    }

    // Check indentation consistency
    const lines = yaml.split('\n');
    let prevIndent = 0;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.trim().startsWith('#') || !line.trim()) continue;

      const indent = line.search(/\S/);
      if (indent % 2 !== 0 && indent !== -1) {
        errors.push(`Line ${i + 1}: Inconsistent indentation (should be multiples of 2)`);
      }
    }

    // Check for tabs
    if (yaml.includes('\t')) {
      errors.push('Contains tabs (should use spaces)');
    }

    if (errors.length === 0) {
      state.text = '✓ Valid docker-compose.yml syntax';
    } else {
      state.text = 'Validation errors:\n' + errors.join('\n');
    }
  } catch (error) {
    state.postError("Validation failed: " + error.message);
  }
}

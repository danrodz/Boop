/**
  {
    "api": 1,
    "name": "Apache Config Validator",
    "description": "Validate Apache httpd.conf syntax",
    "author": "Boop",
    "icon": "server.rack",
    "tags": "apache,httpd,config,validate"
  }
**/

function main(state) {
  try {
    const config = state.text;
    const errors = [];
    const warnings = [];

    // Extract all directive tags
    const openTags = [];
    const closeTags = [];

    const openMatches = config.matchAll(/<(\w+)/g);
    const closeMatches = config.matchAll(/<\/(\w+)>/g);

    for (let match of openMatches) {
      openTags.push(match[1]);
    }

    for (let match of closeMatches) {
      closeTags.push(match[1]);
    }

    // Check matching tags
    if (openTags.length !== closeTags.length) {
      errors.push(`Mismatched directive tags: ${openTags.length} opening, ${closeTags.length} closing`);
    }

    // Check DocumentRoot
    if (config.includes('DocumentRoot')) {
      if (!config.match(/DocumentRoot\s+["\/]/)) {
        warnings.push('DocumentRoot should specify a path');
      }
    }

    // Check ServerName
    if (config.includes('VirtualHost') && !config.includes('ServerName')) {
      warnings.push('VirtualHost should have ServerName directive');
    }

    // Check for common directives
    if (config.includes('<VirtualHost')) {
      if (!config.includes('ErrorLog')) {
        warnings.push('Consider adding ErrorLog directive');
      }
      if (!config.includes('CustomLog')) {
        warnings.push('Consider adding CustomLog directive');
      }
    }

    let result = '';

    if (errors.length === 0 && warnings.length === 0) {
      result = '✓ Apache config syntax looks valid';
    } else {
      if (errors.length > 0) {
        result += 'ERRORS:\n' + errors.join('\n') + '\n\n';
      }
      if (warnings.length > 0) {
        result += 'WARNINGS:\n' + warnings.join('\n');
      }
    }

    state.text = result.trim();
  } catch (error) {
    state.postError("Validation failed: " + error.message);
  }
}

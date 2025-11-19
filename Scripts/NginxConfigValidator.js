/**
  {
    "api": 1,
    "name": "Nginx Config Validator",
    "description": "Validate basic nginx configuration syntax",
    "author": "Boop",
    "icon": "server.rack",
    "tags": "nginx,config,validate"
  }
**/

function main(state) {
  try {
    const config = state.text;
    const errors = [];
    const warnings = [];

    // Count braces
    const opens = (config.match(/{/g) || []).length;
    const closes = (config.match(/}/g) || []).length;

    if (opens !== closes) {
      errors.push(`Mismatched braces: ${opens} opening, ${closes} closing`);
    }

    // Check for server block
    if (!config.includes('server {') && !config.includes('server{')) {
      errors.push('Missing server block');
    }

    // Check listen directive
    if (config.includes('listen')) {
      if (!config.match(/listen\s+\d+/)) {
        warnings.push('listen directive should specify a port number');
      }
    } else if (config.includes('server {')) {
      warnings.push('server block should have listen directive');
    }

    // Check server_name
    if (config.includes('server {') && !config.includes('server_name')) {
      warnings.push('Consider adding server_name directive');
    }

    // Check semicolons
    const directiveLines = config.split('\n').filter(line => {
      const trimmed = line.trim();
      return trimmed && !trimmed.startsWith('#') && !trimmed.endsWith('{') && !trimmed.endsWith('}');
    });

    for (let line of directiveLines) {
      if (!line.trim().endsWith(';')) {
        warnings.push('Directive missing semicolon: ' + line.trim().substring(0, 50));
        break; // Just show first one
      }
    }

    let result = '';

    if (errors.length === 0 && warnings.length === 0) {
      result = '✓ Nginx config syntax looks valid';
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

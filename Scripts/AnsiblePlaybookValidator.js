/**
  {
    "api": 1,
    "name": "Ansible Playbook Validator",
    "description": "Validate basic Ansible playbook structure",
    "author": "Boop",
    "icon": "checklist",
    "tags": "ansible,playbook,validate,yaml"
  }
**/

function main(state) {
  try {
    const yaml = state.text;
    const errors = [];
    const warnings = [];

    // Check required fields
    if (!yaml.includes('hosts:')) {
      errors.push('Missing "hosts:" field');
    }

    if (!yaml.includes('tasks:')) {
      errors.push('Missing "tasks:" field');
    }

    // Check for common issues
    if (yaml.includes('\t')) {
      errors.push('Contains tabs (use spaces)');
    }

    // Check for become usage
    if (yaml.includes('sudo:')) {
      warnings.push('Using deprecated "sudo:", use "become:" instead');
    }

    // Check indentation
    const lines = yaml.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.trim().startsWith('-')) {
        const indent = line.search(/\S/);
        if (indent % 2 !== 0) {
          warnings.push(`Line ${i + 1}: Odd indentation (should be multiples of 2)`);
        }
      }
    }

    // Check for task names
    if (yaml.includes('tasks:') && !yaml.includes('name:')) {
      warnings.push('Tasks should have descriptive "name:" fields');
    }

    let result = '';

    if (errors.length === 0 && warnings.length === 0) {
      result = '✓ Valid Ansible playbook structure';
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

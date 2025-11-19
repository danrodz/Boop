/**
  {
    "api": 1,
    "name": "Docstring Generator",
    "description": "Generate docstrings for functions",
    "author": "Boop",
    "icon": "doc.text.fill",
    "tags": "documentation,docstring,function,comment"
  }
**/

function main(state) {
  try {
    const code = state.text.trim();

    // Try to detect function signature
    let funcMatch = code.match(/^(?:async\s+)?function\s+(\w+)\s*\(([^)]*)\)/);
    let style = 'jsdoc';

    if (!funcMatch) {
      funcMatch = code.match(/^(?:const|let|var)\s+(\w+)\s*=\s*(?:async\s+)?\(([^)]*)\)\s*=>/);
    }

    if (!funcMatch) {
      funcMatch = code.match(/^def\s+(\w+)\s*\(([^)]*)\)/);
      style = 'python';
    }

    if (!funcMatch) {
      funcMatch = code.match(/^(?:public|private|protected)?\s*(?:static\s+)?(?:\w+\s+)?(\w+)\s*\(([^)]*)\)/);
      style = 'java';
    }

    if (!funcMatch) {
      state.postError("Could not detect function signature");
      return;
    }

    const funcName = funcMatch[1];
    const params = funcMatch[2]
      .split(',')
      .map(p => p.trim())
      .filter(p => p.length > 0)
      .map(p => {
        const parts = p.split(/[=:]/);
        return parts[0].trim();
      });

    let docstring = '';

    if (style === 'jsdoc') {
      docstring = '/**\n';
      docstring += ` * ${funcName} - Brief description\n`;
      docstring += ' *\n';

      if (params.length > 0) {
        params.forEach(param => {
          docstring += ` * @param {*} ${param} - Description of ${param}\n`;
        });
      }

      docstring += ' * @returns {*} Description of return value\n';
      docstring += ' */\n';
      docstring += code;

    } else if (style === 'python') {
      docstring = code.replace(/^(def\s+\w+\s*\([^)]*\):)/, `$1\n    """\n    ${funcName} - Brief description\n\n    Args:`);

      if (params.length > 0) {
        params.forEach(param => {
          docstring += `\n        ${param}: Description of ${param}`;
        });
      }

      docstring += '\n\n    Returns:\n        Description of return value\n    """';

    } else {
      docstring = '/**\n';
      docstring += ` * ${funcName} - Brief description\n`;
      docstring += ' *\n';

      if (params.length > 0) {
        params.forEach(param => {
          docstring += ` * @param ${param} Description of ${param}\n`;
        });
      }

      docstring += ' * @return Description of return value\n';
      docstring += ' */\n';
      docstring += code;
    }

    state.text = docstring;
  } catch (error) {
    state.postError("Docstring generation failed: " + error.message);
  }
}

/**
  {
    "api": 1,
    "name": "Generate .gitignore",
    "description": "Generate .gitignore for specified languages/frameworks",
    "author": "Boop",
    "icon": "doc.text",
    "tags": "git,gitignore,generate"
  }
**/

function main(state) {
  try {
    const input = state.text.toLowerCase().trim();

    const templates = {
      'node': [
        'node_modules/',
        'npm-debug.log',
        '.npm',
        '.env',
        'dist/',
        'build/',
      ],
      'python': [
        '__pycache__/',
        '*.py[cod]',
        '*$py.class',
        '.Python',
        'venv/',
        'env/',
        '.env',
        '*.egg-info/',
      ],
      'java': [
        '*.class',
        '*.jar',
        '*.war',
        'target/',
        '.gradle/',
        'build/',
      ],
      'rust': [
        'target/',
        'Cargo.lock',
        '**/*.rs.bk',
      ],
      'go': [
        '*.exe',
        '*.exe~',
        '*.dll',
        '*.so',
        '*.dylib',
        'vendor/',
      ],
      'macos': [
        '.DS_Store',
        '.AppleDouble',
        '.LSOverride',
        '._*',
      ],
      'windows': [
        'Thumbs.db',
        'ehthumbs.db',
        'Desktop.ini',
        '$RECYCLE.BIN/',
      ],
      'vscode': [
        '.vscode/',
        '*.code-workspace',
      ],
      'jetbrains': [
        '.idea/',
        '*.iml',
        '*.iws',
      ],
    };

    let gitignore = '# Generated .gitignore\n\n';

    if (templates[input]) {
      gitignore += `# ${input.toUpperCase()}\n`;
      gitignore += templates[input].join('\n');
    } else {
      // Combine common ones
      gitignore += '# Node.js\n' + templates.node.join('\n') + '\n\n';
      gitignore += '# macOS\n' + templates.macos.join('\n') + '\n\n';
      gitignore += '# IDEs\n' + templates.vscode.join('\n') + '\n';
      gitignore += templates.jetbrains.join('\n');
    }

    state.text = gitignore;
  } catch (error) {
    state.postError("Failed to generate .gitignore: " + error.message);
  }
}

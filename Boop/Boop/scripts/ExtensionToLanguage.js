/**
  {
    "api": 1,
    "name": "Extension to Language",
    "description": "Detect programming language from file extension",
    "author": "Boop",
    "icon": "chevron.left.forwardslash.chevron.right",
    "tags": "extension,language,programming,detect"
  }
**/

function main(state) {
  try {
    const input = state.text.trim().toLowerCase();

    // Extract extension
    let ext = input;
    if (input.includes('.')) {
      ext = input.split('.').pop();
    }

    const languages = {
      // Web
      'js': 'JavaScript',
      'jsx': 'React JSX',
      'ts': 'TypeScript',
      'tsx': 'React TypeScript',
      'html': 'HTML',
      'css': 'CSS',
      'scss': 'Sass',
      'sass': 'Sass',
      'less': 'Less',

      // Backend
      'py': 'Python',
      'rb': 'Ruby',
      'php': 'PHP',
      'java': 'Java',
      'kt': 'Kotlin',
      'scala': 'Scala',
      'go': 'Go',
      'rs': 'Rust',
      'c': 'C',
      'cpp': 'C++',
      'cc': 'C++',
      'h': 'C/C++ Header',
      'cs': 'C#',
      'swift': 'Swift',
      'm': 'Objective-C',

      // Scripting
      'sh': 'Shell Script',
      'bash': 'Bash',
      'zsh': 'Zsh',
      'fish': 'Fish Shell',
      'ps1': 'PowerShell',
      'bat': 'Batch',

      // Data
      'json': 'JSON',
      'yaml': 'YAML',
      'yml': 'YAML',
      'xml': 'XML',
      'toml': 'TOML',
      'ini': 'INI',
      'csv': 'CSV',
      'sql': 'SQL',

      // Markup
      'md': 'Markdown',
      'markdown': 'Markdown',
      'rst': 'reStructuredText',
      'tex': 'LaTeX',

      // Config
      'gitignore': 'Git Ignore',
      'dockerfile': 'Dockerfile',
      'makefile': 'Makefile'
    };

    const language = languages[ext];

    if (!language) {
      state.text = `Unknown extension: .${ext}`;
      return;
    }

    const result = [
      `Extension: .${ext}`,
      `Language: ${language}`,
      ``,
      `Use for syntax highlighting: ${language.toLowerCase().replace(/\s+/g, '-')}`
    ].join('\n');

    state.text = result;
  } catch (error) {
    state.postError("Error detecting language: " + error.message);
  }
}

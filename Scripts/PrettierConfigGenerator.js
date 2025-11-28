/**
  {
    "api": 1,
    "name": "Generate Prettier Config",
    "description": "Generate .prettierrc.json configuration file",
    "author": "Boop",
    "icon": "gear",
    "tags": "prettier,config,format,code-quality"
  }
**/

function main(state) {
  const config = {
    semi: true,
    trailingComma: 'es5',
    singleQuote: true,
    printWidth: 100,
    tabWidth: 2,
    useTabs: false,
    arrowParens: 'avoid',
    endOfLine: 'lf',
    bracketSpacing: true,
    jsxSingleQuote: false,
    jsxBracketSameLine: false
  };

  const prettierignore = `# Ignore artifacts:
build
coverage
dist
node_modules

# Ignore all HTML files:
*.html

# Ignore specific files
package-lock.json
yarn.lock`;

  state.text = `# .prettierrc.json
${JSON.stringify(config, null, 2)}

# .prettierignore
${prettierignore}`;

  state.postInfo("Generated Prettier config");
}

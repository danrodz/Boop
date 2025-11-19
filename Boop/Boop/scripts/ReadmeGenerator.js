/**
  {
    "api": 1,
    "name": "README Generator",
    "description": "Generate README.md template (input: project-name)",
    "author": "Boop",
    "icon": "doc.text",
    "tags": "readme,markdown,documentation,template"
  }
**/

function main(state) {
  const projectName = state.text.trim() || 'Project Name';

  const template = `# ${projectName}

## Description

A brief description of what this project does and who it's for.

## Features

- Feature 1
- Feature 2
- Feature 3

## Installation

\`\`\`bash
npm install ${projectName.toLowerCase()}
\`\`\`

## Usage

\`\`\`javascript
const ${projectName.replace(/[-\s]/g, '')} = require('${projectName.toLowerCase()}');

// Example usage
\`\`\`

## API Reference

### Method Name

\`\`\`javascript
methodName(param1, param2)
\`\`\`

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| \`param1\`  | \`string\` | **Required**. Description |

## Running Tests

\`\`\`bash
npm test
\`\`\`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Authors

- [@yourusername](https://github.com/yourusername)

## Acknowledgements

- [Awesome Readme](https://github.com/matiassingers/awesome-readme)
`;

  state.text = template;
}

/**
  {
    "api": 1,
    "name": "TypeScript to JSDoc",
    "description": "Convert TypeScript type annotations to JSDoc comments",
    "author": "Boop",
    "icon": "code",
    "tags": "typescript,jsdoc,convert,documentation"
  }
**/

function main(state) {
  let result = state.text;

  // Function parameters: (name: string, age: number)
  result = result.replace(/function\s+(\w+)\s*\(([^)]+)\):\s*(\w+)/g, (match, funcName, params, returnType) => {
    let jsdoc = '/**\n';

    params.split(',').forEach(param => {
      const [name, type] = param.split(':').map(s => s.trim());
      jsdoc += ` * @param {${type}} ${name}\n`;
    });

    jsdoc += ` * @returns {${returnType}}\n */\n`;
    jsdoc += `function ${funcName}(${params.split(',').map(p => p.split(':')[0].trim()).join(', ')})`;

    return jsdoc;
  });

  // Variable declarations: const name: string
  result = result.replace(/const\s+(\w+):\s*(\w+)/g, '/** @type {$2} */\nconst $1');
  result = result.replace(/let\s+(\w+):\s*(\w+)/g, '/** @type {$2} */\nlet $1');

  state.text = result;
  state.postInfo("Converted TypeScript to JSDoc");
}

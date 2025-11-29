/**
  {
    "api": 1,
    "name": "Generate TypeScript d.ts",
    "description": "Generate TypeScript declaration file from JavaScript",
    "author": "Boop",
    "icon": "doc.text",
    "tags": "typescript,dts,declaration,generate"
  }
**/

function main(state) {
  try {
    const js = state.text;
    let dts = '// Generated TypeScript declarations\n\n';

    // Find function declarations
    const funcRegex = /(?:export\s+)?function\s+(\w+)\s*\(([^)]*)\)/g;
    let match;

    while ((match = funcRegex.exec(js)) !== null) {
      const funcName = match[1];
      const params = match[2];

      // Parse parameters
      const paramList = params.split(',').map(p => {
        const name = p.trim().split('=')[0].trim() || 'arg';
        return `${name}: any`;
      }).join(', ');

      dts += `export function ${funcName}(${paramList}): any;\n`;
    }

    // Find class declarations
    const classRegex = /(?:export\s+)?class\s+(\w+)/g;
    while ((match = classRegex.exec(js)) !== null) {
      const className = match[1];
      dts += `export class ${className} {\n`;
      dts += `  constructor(...args: any[]);\n`;
      dts += `}\n\n`;
    }

    // Find const exports
    const constRegex = /export\s+const\s+(\w+)/g;
    while ((match = constRegex.exec(js)) !== null) {
      const constName = match[1];
      dts += `export const ${constName}: any;\n`;
    }

    if (dts === '// Generated TypeScript declarations\n\n') {
      dts += '// No exports found\n';
    }

    state.text = dts;
  } catch (error) {
    state.postError("Failed to generate d.ts: " + error.message);
  }
}

/**
  {
    "api": 1,
    "name": "React Props to TypeScript Interface",
    "description": "Convert React component props to TypeScript interface",
    "author": "Boop",
    "icon": "code",
    "tags": "react,typescript,props,interface,convert"
  }
**/

function main(state) {
  try {
    const text = state.text.trim();

    // Extract component name and props
    const match = text.match(/function\s+(\w+)\s*\(\s*\{([^}]+)\}/);
    if (!match) {
      state.postError("Could not parse React component. Expected format: function ComponentName({ prop1, prop2 })");
      return;
    }

    const componentName = match[1];
    const props = match[2].split(',').map(p => p.trim()).filter(p => p);

    let interfaceCode = `interface ${componentName}Props {\n`;
    props.forEach(prop => {
      interfaceCode += `  ${prop}: any;\n`;
    });
    interfaceCode += `}\n\nfunction ${componentName}({ ${props.join(', ')} }: ${componentName}Props) {\n  // component code\n}`;

    state.text = interfaceCode;
  } catch (error) {
    state.postError(`Error: ${error.message}`);
  }
}

/**
  {
    "api": 1,
    "name": "PropTypes to TypeScript",
    "description": "Convert React PropTypes to TypeScript interface",
    "author": "Boop",
    "icon": "code",
    "tags": "react,typescript,proptypes,convert"
  }
**/

function main(state) {
  const propTypeMap = {
    'PropTypes.string': 'string',
    'PropTypes.number': 'number',
    'PropTypes.bool': 'boolean',
    'PropTypes.array': 'any[]',
    'PropTypes.object': 'object',
    'PropTypes.func': '() => void',
    'PropTypes.node': 'React.ReactNode',
    'PropTypes.element': 'React.ReactElement',
    'PropTypes.any': 'any'
  };

  const lines = state.text.split('\n');
  let props = [];

  for (const line of lines) {
    const match = line.match(/(\w+):\s*(PropTypes\.\w+)(\.isRequired)?/);
    if (match) {
      const [, propName, propType, required] = match;
      const tsType = propTypeMap[propType] || 'any';
      const optional = required ? '' : '?';
      props.push(`  ${propName}${optional}: ${tsType};`);
    }
  }

  if (props.length > 0) {
    state.text = `interface Props {\n${props.join('\n')}\n}`;
    state.postInfo("Converted PropTypes to TypeScript");
  } else {
    state.postError("No PropTypes found");
  }
}

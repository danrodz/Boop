/**
  {
    "api": 1,
    "name": "React Class to Hooks",
    "description": "Convert React class component to functional component with hooks",
    "author": "Boop",
    "icon": "code",
    "tags": "react,hooks,class,convert,refactor"
  }
**/

function main(state) {
  let result = state.text;

  // Extract class name
  const classMatch = result.match(/class\s+(\w+)\s+extends/);
  if (!classMatch) {
    state.postError("No class component found");
    return;
  }

  const className = classMatch[1];

  // Convert constructor state to useState
  const stateMatch = result.match(/this\.state\s*=\s*\{([^}]+)\}/s);
  let stateHooks = '';
  if (stateMatch) {
    const stateProps = stateMatch[1].split(',').map(s => s.trim());
    stateProps.forEach(prop => {
      const [key, value] = prop.split(':').map(s => s.trim());
      const stateName = key.replace(/['"]/g, '');
      const capitalizedName = stateName.charAt(0).toUpperCase() + stateName.slice(1);
      stateHooks += `  const [${stateName}, set${capitalizedName}] = useState(${value || 'null'});\n`;
    });
  }

  // Basic conversion template
  result = `import { useState, useEffect } from 'react';

function ${className}(props) {
${stateHooks}
  useEffect(() => {
    // componentDidMount logic here
  }, []);

  return (
    <div>
      {/* Your JSX here */}
    </div>
  );
}

export default ${className};`;

  state.text = result;
  state.postInfo("Converted to functional component with hooks");
}

/**
  {
    "api": 1,
    "name": "YAML to JSON",
    "description": "Converts YAML to JSON (simple subset)",
    "author": "Boop",
    "icon": "arrow.right.doc.on.doc",
    "tags": "yaml,json,convert,parse"
  }
**/

function main(state) {
  try {
    const lines = state.text.split('\n');
    const result = {};
    const stack = [{ obj: result, indent: -1 }];

    for (let line of lines) {
      // Skip comments and empty lines
      if (line.trim().startsWith('#') || !line.trim()) continue;

      const indent = line.search(/\S/);
      const content = line.trim();

      // Pop stack to correct level
      while (stack.length > 1 && stack[stack.length - 1].indent >= indent) {
        stack.pop();
      }

      const current = stack[stack.length - 1].obj;

      if (content.includes(':')) {
        const colonIdx = content.indexOf(':');
        const key = content.substring(0, colonIdx).trim();
        const value = content.substring(colonIdx + 1).trim();

        if (value) {
          // Simple value
          let parsedValue = value;
          if (value === 'true') parsedValue = true;
          else if (value === 'false') parsedValue = false;
          else if (value === 'null') parsedValue = null;
          else if (!isNaN(value) && value !== '') parsedValue = Number(value);
          else if (value.startsWith('"') && value.endsWith('"')) {
            parsedValue = value.slice(1, -1);
          } else if (value.startsWith("'") && value.endsWith("'")) {
            parsedValue = value.slice(1, -1);
          }

          current[key] = parsedValue;
        } else {
          // Nested object
          current[key] = {};
          stack.push({ obj: current[key], indent });
        }
      } else if (content.startsWith('- ')) {
        // Array item
        const value = content.substring(2).trim();
        let parsedValue = value;

        if (value === 'true') parsedValue = true;
        else if (value === 'false') parsedValue = false;
        else if (value === 'null') parsedValue = null;
        else if (!isNaN(value) && value !== '') parsedValue = Number(value);

        // Find the parent array
        const parent = stack[stack.length - 1].obj;
        const lastKey = Object.keys(parent).pop();

        if (!Array.isArray(parent[lastKey])) {
          parent[lastKey] = [];
        }

        parent[lastKey].push(parsedValue);
      }
    }

    state.text = JSON.stringify(result, null, 2);

  } catch (error) {
    state.postError("Failed to parse YAML: " + error.message + "\nNote: This parser supports simple YAML only.");
  }
}

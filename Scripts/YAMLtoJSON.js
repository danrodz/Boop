/**
  {
    "api": 1,
    "name": "YAML to JSON",
    "description": "Convert simple YAML to JSON format",
    "author": "Boop",
    "icon": "doc",
    "tags": "yaml,json,convert,format"
  }
**/

function main(state) {
  try {
    const lines = state.text.split('\n');
    const obj = {};
    const stack = [{ obj, indent: -1 }];

    lines.forEach(line => {
      if (!line.trim() || line.trim().startsWith('#')) return;

      const indent = line.search(/\S/);
      const trimmed = line.trim();

      // Pop stack to current level
      while (stack.length > 1 && stack[stack.length - 1].indent >= indent) {
        stack.pop();
      }

      const current = stack[stack.length - 1].obj;

      if (trimmed.startsWith('- ')) {
        // Array item
        const value = trimmed.substring(2).trim();
        if (!Array.isArray(current)) {
          state.postError("Parse error: unexpected array item");
          return;
        }
        current.push(value.replace(/^["']|["']$/g, ''));
      } else if (trimmed.includes(':')) {
        const [key, ...valueParts] = trimmed.split(':');
        const value = valueParts.join(':').trim();

        if (value === '') {
          // Object or array coming
          current[key.trim()] = {};
          stack.push({ obj: current[key.trim()], indent });
        } else {
          current[key.trim()] = value.replace(/^["']|["']$/g, '');
        }
      }
    });

    state.text = JSON.stringify(obj, null, 2);
    state.postInfo("Converted to JSON");
  } catch (error) {
    state.postError(`Error parsing YAML: ${error.message}`);
  }
}

/**
  {
    "api":1,
    "name":"JSON Path Extractor",
    "description":"Extract value from JSON using dot notation path (e.g., users.0.name)",
    "author":"Boop",
    "icon":"search",
    "tags":"json,path,extract,query"
  }
**/

function main(state) {
  const input = state.text.trim();

  // Check if input contains a newline - if so, treat first line as path
  const lines = input.split('\n');

  let jsonText, path;

  if (lines.length > 1) {
    // First line is the path, rest is JSON
    path = lines[0].trim();
    jsonText = lines.slice(1).join('\n');
  } else {
    // Single line - show help
    state.text = `JSON Path Extractor

Usage:
Line 1: Path (e.g., users.0.name)
Line 2+: JSON data

Example:
users.0.name
{"users":[{"name":"Alice","age":30}]}

Supported path syntax:
- Dot notation: obj.key.nested
- Array indexing: arr.0.key
- Mixed: data.items.0.name`;
    return;
  }

  try {
    const obj = JSON.parse(jsonText);
    const result = extractPath(obj, path);

    if (result === undefined) {
      state.postError(`Path "${path}" not found in JSON`);
      return;
    }

    // Format the output
    if (typeof result === 'object') {
      state.text = JSON.stringify(result, null, 2);
    } else {
      state.text = String(result);
    }
  } catch (error) {
    state.postError("Invalid JSON or path");
  }
}

function extractPath(obj, path) {
  if (!path) {
    return obj;
  }

  const keys = path.split('.');
  let current = obj;

  for (const key of keys) {
    if (current === null || current === undefined) {
      return undefined;
    }

    // Check if key is array index
    if (/^\d+$/.test(key)) {
      const index = parseInt(key, 10);
      if (Array.isArray(current) && index < current.length) {
        current = current[index];
      } else {
        return undefined;
      }
    } else {
      if (typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        return undefined;
      }
    }
  }

  return current;
}

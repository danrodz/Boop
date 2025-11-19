/**
  {
    "api": 1,
    "name": "JSON Path Query",
    "description": "Extracts values from JSON using JSONPath-like syntax",
    "author": "Boop",
    "icon": "arrow.down.right.circle.fill",
    "tags": "json,path,query,extract,jq"
  }
**/

function main(state) {
  try {
    const lines = state.text.split('\n');

    if (lines.length < 2) {
      state.postError("Format: Line 1 = path (e.g., 'users.0.name'), Line 2+ = JSON");
      return;
    }

    const path = lines[0].trim();
    const jsonText = lines.slice(1).join('\n');
    const data = JSON.parse(jsonText);

    // Parse and navigate path
    const parts = path.split('.');
    let current = data;

    for (const part of parts) {
      if (current === null || current === undefined) {
        state.postError(`Path not found: ${path}`);
        return;
      }

      // Handle array index
      if (/^\d+$/.test(part)) {
        const index = parseInt(part);
        if (Array.isArray(current) && index < current.length) {
          current = current[index];
        } else {
          state.postError(`Invalid array index: ${part}`);
          return;
        }
      } else {
        // Handle object property
        if (typeof current === 'object' && part in current) {
          current = current[part];
        } else {
          state.postError(`Property not found: ${part}`);
          return;
        }
      }
    }

    // Format output
    if (typeof current === 'object') {
      state.text = JSON.stringify(current, null, 2);
    } else {
      state.text = String(current);
    }

  } catch (error) {
    state.postError("Failed to query JSON: " + error.message);
  }
}

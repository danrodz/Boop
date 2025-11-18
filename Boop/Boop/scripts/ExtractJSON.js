/**
  {
    "api": 1,
    "name": "Extract JSON Objects",
    "description": "Extracts all JSON objects from text",
    "author": "Boop",
    "icon": "braces",
    "tags": "extract,json,parse,find,object"
  }
**/

function main(state) {
  try {
    const text = state.text;
    const jsonObjects = [];
    let depth = 0;
    let start = -1;

    for (let i = 0; i < text.length; i++) {
      if (text[i] === '{') {
        if (depth === 0) {
          start = i;
        }
        depth++;
      } else if (text[i] === '}') {
        depth--;
        if (depth === 0 && start !== -1) {
          const jsonStr = text.substring(start, i + 1);
          try {
            JSON.parse(jsonStr);
            jsonObjects.push(jsonStr);
          } catch (e) {
            // Not valid JSON, skip
          }
          start = -1;
        }
      }
    }

    if (jsonObjects.length > 0) {
      state.text = jsonObjects.join('\n\n');
      state.postInfo(`Found ${jsonObjects.length} JSON object(s)`);
    } else {
      state.text = '';
      state.postInfo('No valid JSON objects found');
    }
  } catch (error) {
    state.postError("Failed to extract JSON: " + error.message);
  }
}

/**
  {
    "api": 1,
    "name": "Protobuf Text to JSON",
    "description": "Convert Protocol Buffer text format to JSON",
    "author": "Boop",
    "icon": "doc",
    "tags": "protobuf,json,convert,api"
  }
**/

function main(state) {
  let text = state.text.trim();

  // Simple protobuf text format parser
  // field: value -> "field": "value"
  text = text.replace(/(\w+):\s*"([^"]*)"/g, '"$1": "$2"');
  text = text.replace(/(\w+):\s*([0-9.]+)/g, '"$1": $2');
  text = text.replace(/(\w+):\s*true/g, '"$1": true');
  text = text.replace(/(\w+):\s*false/g, '"$1": false');

  // Wrap in braces if not already
  if (!text.startsWith('{')) {
    text = '{ ' + text + ' }';
  }

  try {
    // Validate JSON
    const obj = JSON.parse(text);
    state.text = JSON.stringify(obj, null, 2);
    state.postInfo("Converted to JSON");
  } catch (error) {
    state.postError(`Could not parse as JSON: ${error.message}`);
  }
}

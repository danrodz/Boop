/**
  {
    "api": 1,
    "name": "Unescape JSON String",
    "description": "Unescapes JSON string to plain text",
    "author": "Boop",
    "icon": "chevron.left.forwardslash.chevron.right",
    "tags": "json,unescape,string,decode"
  }
**/

function main(state) {
  try {
    let text = state.text.trim();

    // If wrapped in quotes, parse as JSON string
    if ((text.startsWith('"') && text.endsWith('"')) ||
        (text.startsWith("'") && text.endsWith("'"))) {
      text = JSON.parse(text.replace(/^'|'$/g, '"'));
    } else {
      // Manual unescape
      text = text
        .replace(/\\n/g, '\n')
        .replace(/\\r/g, '\r')
        .replace(/\\t/g, '\t')
        .replace(/\\"/g, '"')
        .replace(/\\\\/g, '\\');
    }

    state.text = text;
  } catch (error) {
    state.postError("Failed to unescape: " + error.message);
  }
}

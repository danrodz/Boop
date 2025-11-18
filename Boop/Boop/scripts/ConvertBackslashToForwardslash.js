/**
  {
    "api": 1,
    "name": "Convert \\ to /",
    "description": "Converts backslashes to forward slashes (Windows to Unix paths)",
    "author": "Boop",
    "icon": "path",
    "tags": "path,separator,backslash,forwardslash,windows,unix"
  }
**/

function main(state) {
  try {
    state.text = state.text.replace(/\\/g, '/');
  } catch (error) {
    state.postError("Failed to convert path separators");
  }
}

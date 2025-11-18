/**
  {
    "api": 1,
    "name": "Convert / to \\",
    "description": "Converts forward slashes to backslashes (Unix to Windows paths)",
    "author": "Boop",
    "icon": "path",
    "tags": "path,separator,forwardslash,backslash,unix,windows"
  }
**/

function main(state) {
  try {
    state.text = state.text.replace(/\//g, '\\');
  } catch (error) {
    state.postError("Failed to convert path separators");
  }
}

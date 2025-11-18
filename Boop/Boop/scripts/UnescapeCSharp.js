/**
  {
    "api": 1,
    "name": "Unescape C# String",
    "description": "Unescapes C# string escape sequences",
    "author": "Boop",
    "icon": "quote",
    "tags": "unescape,csharp,c#,string,quotes"
  }
**/

function main(state) {
  try {
    state.text = state.text
      .replace(/\\t/g, '\t')
      .replace(/\\n/g, '\n')
      .replace(/\\r/g, '\r')
      .replace(/\\f/g, '\f')
      .replace(/\\"/g, '"')
      .replace(/\\'/g, "'")
      .replace(/\\0/g, '\0')
      .replace(/\\\\/g, '\\');
  } catch (error) {
    state.postError("Failed to unescape C# string");
  }
}

/**
  {
    "api": 1,
    "name": "Escape C# String",
    "description": "Escapes special characters for C# strings",
    "author": "Boop",
    "icon": "quote",
    "tags": "escape,csharp,c#,string,quotes"
  }
**/

function main(state) {
  try {
    state.text = state.text
      .replace(/\\/g, '\\\\')
      .replace(/\t/g, '\\t')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r')
      .replace(/\f/g, '\\f')
      .replace(/"/g, '\\"')
      .replace(/'/g, "\\'")
      .replace(/\0/g, '\\0');
  } catch (error) {
    state.postError("Failed to escape C# string");
  }
}

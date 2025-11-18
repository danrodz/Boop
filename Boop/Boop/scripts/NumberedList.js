/**
  {
    "api": 1,
    "name": "Convert to Numbered List",
    "description": "Converts lines to a numbered list (1., 2., 3., etc.)",
    "author": "Boop",
    "icon": "list",
    "tags": "numbered,list,format,markdown"
  }
**/

function main(state) {
  try {
    const lines = state.text.split("\n");
    const numbered = lines.map((line, index) => `${index + 1}. ${line}`);
    state.text = numbered.join("\n");
  } catch (error) {
    state.postError("Failed to create numbered list");
  }
}

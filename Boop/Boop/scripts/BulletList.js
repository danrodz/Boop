/**
  {
    "api": 1,
    "name": "Convert to Bullet List",
    "description": "Converts lines to a bullet list (- item format)",
    "author": "Boop",
    "icon": "list",
    "tags": "bullet,list,format,markdown,dash"
  }
**/

function main(state) {
  try {
    const lines = state.text.split("\n");
    const bulleted = lines.map(line => `- ${line}`);
    state.text = bulleted.join("\n");
  } catch (error) {
    state.postError("Failed to create bullet list");
  }
}

/**
  {
    "api": 1,
    "name": "Convert to Checkbox List",
    "description": "Converts lines to a checkbox list (- [ ] item format)",
    "author": "Boop",
    "icon": "checkbox",
    "tags": "checkbox,list,todo,task,markdown"
  }
**/

function main(state) {
  try {
    const lines = state.text.split("\n");
    const checkboxes = lines.map(line => `- [ ] ${line}`);
    state.text = checkboxes.join("\n");
  } catch (error) {
    state.postError("Failed to create checkbox list");
  }
}

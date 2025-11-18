/**
  {
    "api": 1,
    "name": "Escape XML",
    "description": "Escapes special characters for XML",
    "author": "Boop",
    "icon": "quote",
    "tags": "escape,xml,entities"
  }
**/

function main(state) {
  try {
    state.text = state.text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  } catch (error) {
    state.postError("Failed to escape XML");
  }
}

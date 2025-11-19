/**
  {
    "api": 1,
    "name": "Extract Directory",
    "description": "Extracts directory from path",
    "author": "Boop",
    "icon": "folder",
    "tags": "file,path,filename,directory"
  }
**/

function main(state) {
  const path = state.text.trim();
  const parts = path.split('/');
  parts.pop();
  state.text = parts.join('/') || '/';
}

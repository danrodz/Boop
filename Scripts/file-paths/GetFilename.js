/**
  {
    "api": 1,
    "name": "Extract Filename",
    "description": "Extracts filename from path",
    "author": "Boop",
    "icon": "folder",
    "tags": "file,path,filename,directory"
  }
**/

function main(state) {
  const path = state.text.trim();
  const filename = path.split('/').pop().split('\\').pop();
  state.text = filename;
}

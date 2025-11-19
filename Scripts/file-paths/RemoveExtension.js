/**
  {
    "api": 1,
    "name": "Remove File Extension",
    "description": "Removes file extension from path",
    "author": "Boop",
    "icon": "folder",
    "tags": "file,path,filename,directory"
  }
**/

function main(state) {
  const path = state.text.trim();
  state.text = path.replace(/\.[^/.]+$/, '');
}

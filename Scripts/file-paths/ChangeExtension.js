/**
  {
    "api": 1,
    "name": "Change Extension to .txt",
    "description": "Changes file extension to .txt",
    "author": "Boop",
    "icon": "folder",
    "tags": "file,path,filename,directory"
  }
**/

function main(state) {
  const path = state.text.trim().replace(/\.[^/.]+$/, '');
  state.text = path + '.txt';
}

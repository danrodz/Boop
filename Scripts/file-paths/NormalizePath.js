/**
  {
    "api": 1,
    "name": "Normalize Path",
    "description": "Normalizes file path",
    "author": "Boop",
    "icon": "folder",
    "tags": "file,path,filename,directory"
  }
**/

function main(state) {
  let path = state.text.trim();
  path = path.replace(/\\/g, '/');
  path = path.replace(/\/\/+/g, '/');
  path = path.replace(/\/\.\//, '/');
  state.text = path;
}

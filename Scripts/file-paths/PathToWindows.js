/**
  {
    "api": 1,
    "name": "Convert Path to Windows",
    "description": "Converts Unix path to Windows",
    "author": "Boop",
    "icon": "folder",
    "tags": "file,path,filename,directory"
  }
**/

function main(state) {
  state.text = state.text.replace(/\//g, '\\');
}

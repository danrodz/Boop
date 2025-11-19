/**
  {
    "api": 1,
    "name": "Convert Path to Unix",
    "description": "Converts Windows path to Unix",
    "author": "Boop",
    "icon": "folder",
    "tags": "file,path,filename,directory"
  }
**/

function main(state) {
  state.text = state.text.replace(/\\/g, '/');
}

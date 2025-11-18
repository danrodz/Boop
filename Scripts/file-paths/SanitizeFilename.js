/**
  {
    "api": 1,
    "name": "Sanitize Filename",
    "description": "Removes invalid filename characters",
    "author": "Boop",
    "icon": "folder",
    "tags": "file,path,filename,directory"
  }
**/

function main(state) {
  const invalid = /[<>:"\/\\|?*]/g;
  state.text = state.text.replace(invalid, '_');
}

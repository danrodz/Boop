/**
  {
    "api": 1,
    "name": "Extract File Extension",
    "description": "Extracts file extension",
    "author": "Boop",
    "icon": "folder",
    "tags": "file,path,filename,directory"
  }
**/

function main(state) {
  const path = state.text.trim();
  const filename = path.split('/').pop().split('\\').pop();
  const ext = filename.includes('.') ? filename.split('.').pop() : '';
  state.text = ext;
}

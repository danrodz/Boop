/**
  {
    "api": 1,
    "name": "File Extension Changer",
    "description": "Change file extensions (format: old_ext new_ext on separate lines)",
    "author": "Boop",
    "icon": "doc.badge.gearshape",
    "tags": "file,extension,change,rename,path"
  }
**/

function main(state) {
  try {
    const lines = state.text.split('\n');
    const filePaths = lines.slice(0, -2);
    const oldExt = lines[lines.length - 2]?.trim() || '';
    const newExt = lines[lines.length - 1]?.trim() || '';

    if (!oldExt || !newExt) {
      state.text = 'Format:\nfile1.txt\nfile2.txt\n.txt\n.md';
      return;
    }

    // Ensure extensions start with dot
    const oldExtNormalized = oldExt.startsWith('.') ? oldExt : '.' + oldExt;
    const newExtNormalized = newExt.startsWith('.') ? newExt : '.' + newExt;

    const changed = filePaths.map(path => {
      if (path.endsWith(oldExtNormalized)) {
        return path.slice(0, -oldExtNormalized.length) + newExtNormalized;
      }
      return path;
    });

    state.text = changed.join('\n');
  } catch (error) {
    state.postError("Error changing extensions: " + error.message);
  }
}

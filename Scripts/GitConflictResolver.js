/**
  {
    "api": 1,
    "name": "Git Conflict - Keep Ours",
    "description": "Extracts 'ours' (HEAD) version from git merge conflicts",
    "author": "Boop",
    "icon": "arrow.triangle.branch",
    "tags": "git,conflict,merge,ours,head"
  }
**/

function main(state) {
  var text = state.text;
  var conflictPattern = /<<<<<<< .*?\n([\s\S]*?)=======\n[\s\S]*?>>>>>>> .*?\n?/g;
  var conflicts = 0;
  
  var resolved = text.replace(conflictPattern, function(match, ours) {
    conflicts++;
    return ours;
  });
  
  if (conflicts === 0) {
    state.postError("No git conflicts found");
    return;
  }
  
  state.text = resolved;
  state.postInfo("Resolved " + conflicts + " conflict(s) using 'ours'");
}

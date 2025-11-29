/**
  {
    "api": 1,
    "name": "Dedent Code",
    "description": "Removes common leading whitespace from all lines",
    "author": "Boop",
    "icon": "decrease.indent",
    "tags": "dedent,indent,whitespace,code,format"
  }
**/

function main(state) {
  var lines = state.text.split("\n");
  
  // Find minimum indentation (ignoring empty lines)
  var minIndent = Infinity;
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    if (line.trim().length === 0) continue;
    
    var indent = line.match(/^(\s*)/)[1].length;
    if (indent < minIndent) {
      minIndent = indent;
    }
  }
  
  if (minIndent === Infinity || minIndent === 0) {
    state.postInfo("No common indentation to remove");
    return;
  }
  
  // Remove the common indentation
  var dedented = lines.map(function(line) {
    if (line.trim().length === 0) return line.trim();
    return line.substring(minIndent);
  });
  
  state.text = dedented.join("\n");
  state.postInfo("Removed " + minIndent + " spaces of common indentation");
}

/**
  {
    "api": 1,
    "name": "Generate Table of Contents",
    "description": "Generates markdown table of contents from headings",
    "author": "Boop",
    "icon": "list.bullet",
    "tags": "markdown,toc,table,contents,headings"
  }
**/

function main(state) {
  var text = state.text;
  var lines = text.split("\n");
  var toc = [];
  
  var headingPattern = /^(#{1,6})\s+(.+)$/;
  
  lines.forEach(function(line) {
    var match = line.match(headingPattern);
    if (match) {
      var level = match[1].length;
      var title = match[2].trim();
      
      // Remove inline code and links from title for cleaner TOC
      var cleanTitle = title.replace(/`[^`]+`/g, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
      
      // Generate anchor (GitHub style)
      var anchor = cleanTitle
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
      
      var indent = "  ".repeat(level - 1);
      toc.push(indent + "- [" + cleanTitle + "](#" + anchor + ")");
    }
  });
  
  if (toc.length === 0) {
    state.postError("No headings found");
    return;
  }
  
  var output = [
    "## Table of Contents",
    "",
    toc.join("\n"),
    "",
    "---",
    "",
    state.text
  ];
  
  state.text = output.join("\n");
  state.postInfo("Generated TOC with " + toc.length + " entries");
}

/**
  {
    "api": 1,
    "name": "Parse CHANGELOG",
    "description": "Extracts version information from CHANGELOG.md",
    "author": "Boop",
    "icon": "doc.text",
    "tags": "changelog,parse,version,release,notes"
  }
**/

function main(state) {
  var text = state.text;
  var versions = [];
  
  // Match version headers like ## [1.0.0] or ## 1.0.0 or ### Version 1.0.0
  var versionPattern = /^##\s*\[?(v?\d+\.\d+\.\d+[^\]]*)\]?(?:\s*[-–—]\s*(.+))?$/gm;
  var match;
  
  while ((match = versionPattern.exec(text)) !== null) {
    var version = match[1].trim();
    var date = match[2] ? match[2].trim() : null;
    
    // Find content until next version or end
    var startIdx = match.index + match[0].length;
    var endIdx = text.length;
    
    // Look for next version header
    var nextMatch = text.slice(startIdx).match(/^##\s*\[?v?\d+\.\d+/m);
    if (nextMatch) {
      endIdx = startIdx + nextMatch.index;
    }
    
    var content = text.slice(startIdx, endIdx).trim();
    
    // Extract categories
    var categories = {};
    var categoryPattern = /^###\s*(.+)$/gm;
    var catMatch;
    var lastCatEnd = 0;
    var lastCat = "General";
    
    while ((catMatch = categoryPattern.exec(content)) !== null) {
      if (lastCat && catMatch.index > lastCatEnd) {
        var catContent = content.slice(lastCatEnd, catMatch.index).trim();
        if (catContent) categories[lastCat] = catContent;
      }
      lastCat = catMatch[1].trim();
      lastCatEnd = catMatch.index + catMatch[0].length;
    }
    
    if (lastCatEnd < content.length) {
      var remaining = content.slice(lastCatEnd).trim();
      if (remaining) categories[lastCat] = remaining;
    }
    
    versions.push({
      version: version,
      date: date,
      categories: Object.keys(categories).length > 0 ? categories : null,
      raw: content.split("\n").slice(0, 5).join("\n") + (content.split("\n").length > 5 ? "..." : "")
    });
  }
  
  if (versions.length === 0) {
    state.postError("No version entries found");
    return;
  }
  
  var output = {
    latestVersion: versions[0].version,
    latestDate: versions[0].date,
    totalVersions: versions.length,
    versions: versions.slice(0, 10) // Limit to 10 most recent
  };
  
  state.text = JSON.stringify(output, null, 2);
  state.postInfo("Found " + versions.length + " version(s)");
}

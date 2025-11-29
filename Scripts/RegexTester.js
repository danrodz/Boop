/**
  {
    "api": 1,
    "name": "Regex Tester",
    "description": "Tests regex pattern against text (first line: pattern, rest: text)",
    "author": "Boop",
    "icon": "magnifyingglass",
    "tags": "regex,test,match,pattern,search"
  }
**/

function main(state) {
  var lines = state.text.split("\n");
  var patternLine = lines[0].trim();
  var text = lines.slice(1).join("\n");
  
  // Extract flags if present (e.g., /pattern/gi)
  var flags = "g";
  var pattern = patternLine;
  
  if (patternLine.startsWith("/")) {
    var lastSlash = patternLine.lastIndexOf("/");
    if (lastSlash > 0) {
      pattern = patternLine.slice(1, lastSlash);
      flags = patternLine.slice(lastSlash + 1) || "g";
    }
  }
  
  var regex;
  try {
    regex = new RegExp(pattern, flags);
  } catch (e) {
    state.postError("Invalid regex: " + e.message);
    return;
  }
  
  var matches = [];
  var match;
  
  if (flags.indexOf("g") > -1) {
    while ((match = regex.exec(text)) !== null) {
      var groups = [];
      for (var i = 1; i < match.length; i++) {
        groups.push("  Group " + i + ": \"" + match[i] + "\"");
      }
      
      matches.push({
        match: match[0],
        index: match.index,
        groups: groups
      });
      
      // Prevent infinite loops with zero-width matches
      if (match[0].length === 0) regex.lastIndex++;
    }
  } else {
    match = regex.exec(text);
    if (match) {
      var groups = [];
      for (var i = 1; i < match.length; i++) {
        groups.push("  Group " + i + ": \"" + match[i] + "\"");
      }
      matches.push({
        match: match[0],
        index: match.index,
        groups: groups
      });
    }
  }
  
  if (matches.length === 0) {
    state.text = "Pattern: " + pattern + "\nFlags: " + flags + "\n\nNo matches found.";
    state.postInfo("No matches");
    return;
  }
  
  var output = [
    "Pattern: " + pattern,
    "Flags: " + flags,
    "Matches: " + matches.length,
    ""
  ];
  
  matches.forEach(function(m, idx) {
    output.push("Match " + (idx + 1) + " at index " + m.index + ":");
    output.push("  \"" + m.match + "\"");
    if (m.groups.length > 0) {
      output = output.concat(m.groups);
    }
    output.push("");
  });
  
  state.text = output.join("\n");
  state.postInfo("Found " + matches.length + " match(es)");
}

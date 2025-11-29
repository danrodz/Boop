/**
  {
    "api": 1,
    "name": "JSONPath Query",
    "description": "Queries JSON with JSONPath (first line: path, rest: JSON)",
    "author": "Boop",
    "icon": "magnifyingglass",
    "tags": "json,jsonpath,query,filter,extract"
  }
**/

function main(state) {
  var lines = state.text.split("\n");
  var path = lines[0].trim();
  var json = lines.slice(1).join("\n");
  
  var obj;
  try {
    obj = JSON.parse(json);
  } catch (e) {
    state.postError("Invalid JSON: " + e.message);
    return;
  }
  
  function query(obj, path) {
    // Remove leading $. if present
    path = path.replace(/^\$\.?/, "");
    if (!path) return [obj];
    
    var results = [obj];
    var parts = [];
    var current = "";
    var inBracket = false;
    
    // Parse path into parts
    for (var i = 0; i < path.length; i++) {
      var char = path[i];
      if (char === "[") {
        if (current) parts.push(current);
        current = "";
        inBracket = true;
      } else if (char === "]") {
        parts.push(current);
        current = "";
        inBracket = false;
      } else if (char === "." && !inBracket) {
        if (current) parts.push(current);
        current = "";
      } else {
        current += char;
      }
    }
    if (current) parts.push(current);
    
    // Execute query
    for (var p = 0; p < parts.length; p++) {
      var part = parts[p];
      var newResults = [];
      
      for (var r = 0; r < results.length; r++) {
        var item = results[r];
        if (item === null || item === undefined) continue;
        
        if (part === "*") {
          // Wildcard - all children
          if (Array.isArray(item)) {
            newResults = newResults.concat(item);
          } else if (typeof item === "object") {
            newResults = newResults.concat(Object.values(item));
          }
        } else if (part.indexOf(":") > -1) {
          // Array slice
          if (Array.isArray(item)) {
            var sliceParts = part.split(":");
            var start = sliceParts[0] ? parseInt(sliceParts[0]) : 0;
            var end = sliceParts[1] ? parseInt(sliceParts[1]) : item.length;
            newResults = newResults.concat(item.slice(start, end));
          }
        } else if (/^\d+$/.test(part)) {
          // Array index
          var idx = parseInt(part);
          if (Array.isArray(item) && item[idx] !== undefined) {
            newResults.push(item[idx]);
          }
        } else {
          // Property access
          if (item[part] !== undefined) {
            newResults.push(item[part]);
          }
        }
      }
      
      results = newResults;
    }
    
    return results;
  }
  
  var results = query(obj, path);
  
  if (results.length === 0) {
    state.text = "No results found for path: " + path;
    state.postError("No results");
  } else if (results.length === 1) {
    state.text = JSON.stringify(results[0], null, 2);
    state.postInfo("Found 1 result");
  } else {
    state.text = JSON.stringify(results, null, 2);
    state.postInfo("Found " + results.length + " results");
  }
}

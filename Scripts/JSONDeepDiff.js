/**
  {
    "api": 1,
    "name": "JSON Deep Diff",
    "description": "Shows detailed differences between two JSON objects (separate with ---)",
    "author": "Boop",
    "icon": "arrow.left.arrow.right",
    "tags": "json,diff,compare,difference,changes"
  }
**/

function main(state) {
  var parts = state.text.split(/^---$/m);
  if (parts.length !== 2) {
    state.postError("Separate two JSON objects with --- on its own line");
    return;
  }
  
  var obj1, obj2;
  try {
    obj1 = JSON.parse(parts[0].trim());
    obj2 = JSON.parse(parts[1].trim());
  } catch (e) {
    state.postError("Invalid JSON: " + e.message);
    return;
  }
  
  var differences = [];
  
  function diff(path, a, b) {
    var pathStr = path.join(".");
    
    if (a === b) return;
    
    if (a === null || b === null || typeof a !== typeof b) {
      differences.push({path: pathStr, type: "changed", from: a, to: b});
      return;
    }
    
    if (Array.isArray(a) && Array.isArray(b)) {
      var maxLen = Math.max(a.length, b.length);
      for (var i = 0; i < maxLen; i++) {
        if (i >= a.length) {
          differences.push({path: pathStr + "[" + i + "]", type: "added", value: b[i]});
        } else if (i >= b.length) {
          differences.push({path: pathStr + "[" + i + "]", type: "removed", value: a[i]});
        } else {
          diff(path.concat("[" + i + "]"), a[i], b[i]);
        }
      }
      return;
    }
    
    if (typeof a === "object" && typeof b === "object") {
      var allKeys = {};
      Object.keys(a).forEach(function(k) { allKeys[k] = true; });
      Object.keys(b).forEach(function(k) { allKeys[k] = true; });
      
      Object.keys(allKeys).forEach(function(key) {
        var newPath = path.concat(key);
        if (!(key in a)) {
          differences.push({path: newPath.join("."), type: "added", value: b[key]});
        } else if (!(key in b)) {
          differences.push({path: newPath.join("."), type: "removed", value: a[key]});
        } else {
          diff(newPath, a[key], b[key]);
        }
      });
      return;
    }
    
    if (a !== b) {
      differences.push({path: pathStr || "(root)", type: "changed", from: a, to: b});
    }
  }
  
  diff([], obj1, obj2);
  
  if (differences.length === 0) {
    state.text = "No differences found - objects are identical";
    state.postInfo("Objects are identical");
    return;
  }
  
  var output = differences.map(function(d) {
    if (d.type === "added") {
      return "+ " + d.path + ": " + JSON.stringify(d.value);
    } else if (d.type === "removed") {
      return "- " + d.path + ": " + JSON.stringify(d.value);
    } else {
      return "~ " + d.path + ":\n    from: " + JSON.stringify(d.from) + "\n    to:   " + JSON.stringify(d.to);
    }
  });
  
  state.text = "Found " + differences.length + " difference(s):\n\n" + output.join("\n\n");
  state.postInfo("Found " + differences.length + " difference(s)");
}

/**
  {
    "api": 1,
    "name": "TOML to JSON",
    "description": "Converts TOML format to JSON",
    "author": "Boop",
    "icon": "doc.text",
    "tags": "toml,json,config,parse,convert"
  }
**/

function main(state) {
  var lines = state.text.split("\n");
  var result = {};
  var currentTable = null;
  var currentPath = [];
  
  function setPath(obj, path, value) {
    var current = obj;
    for (var i = 0; i < path.length - 1; i++) {
      if (!current[path[i]]) current[path[i]] = {};
      current = current[path[i]];
    }
    current[path[path.length - 1]] = value;
  }
  
  function getPath(obj, path) {
    var current = obj;
    for (var i = 0; i < path.length; i++) {
      if (!current[path[i]]) current[path[i]] = {};
      current = current[path[i]];
    }
    return current;
  }
  
  function parseValue(value) {
    value = value.trim();
    
    // String (basic or literal)
    if (value.startsWith('"') && value.endsWith('"')) {
      return value.slice(1, -1).replace(/\\n/g, "\n").replace(/\\t/g, "\t").replace(/\\"/g, '"');
    }
    if (value.startsWith("'") && value.endsWith("'")) {
      return value.slice(1, -1);
    }
    
    // Boolean
    if (value === "true") return true;
    if (value === "false") return false;
    
    // Array
    if (value.startsWith("[") && value.endsWith("]")) {
      var inner = value.slice(1, -1).trim();
      if (!inner) return [];
      // Simple array parsing (doesn't handle nested arrays well)
      return inner.split(",").map(function(v) { return parseValue(v.trim()); });
    }
    
    // Number
    if (/^-?\d+$/.test(value)) return parseInt(value);
    if (/^-?\d+\.\d+$/.test(value)) return parseFloat(value);
    if (/^-?\d+[eE][+-]?\d+$/.test(value)) return parseFloat(value);
    
    // DateTime
    if (/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2})?/.test(value)) {
      return value;
    }
    
    return value;
  }
  
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i].trim();
    
    // Skip empty lines and comments
    if (!line || line.startsWith("#")) continue;
    
    // Table header [table] or [[array]]
    var tableMatch = line.match(/^\[{1,2}([^\]]+)\]{1,2}$/);
    if (tableMatch) {
      currentPath = tableMatch[1].split(".");
      var target = getPath(result, currentPath);
      continue;
    }
    
    // Key-value pair
    var eqIndex = line.indexOf("=");
    if (eqIndex > -1) {
      var key = line.substring(0, eqIndex).trim();
      var value = line.substring(eqIndex + 1).trim();
      
      var fullPath = currentPath.concat(key);
      setPath(result, fullPath, parseValue(value));
    }
  }
  
  state.text = JSON.stringify(result, null, 2);
  state.postInfo("TOML converted to JSON");
}

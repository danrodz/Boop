/**
  {
    "api": 1,
    "name": "JSON Flatten",
    "description": "Flattens nested JSON to dot notation",
    "author": "Boop",
    "icon": "square.stack.3d.down.right",
    "tags": "json,flatten,nested,dot,notation"
  }
**/

function main(state) {
  var obj;
  try {
    obj = JSON.parse(state.text);
  } catch (e) {
    state.postError("Invalid JSON: " + e.message);
    return;
  }
  
  function flatten(obj, prefix, result) {
    prefix = prefix || "";
    result = result || {};
    
    if (obj === null || typeof obj !== "object") {
      result[prefix] = obj;
      return result;
    }
    
    if (Array.isArray(obj)) {
      if (obj.length === 0) {
        result[prefix] = [];
      } else {
        for (var i = 0; i < obj.length; i++) {
          flatten(obj[i], prefix + "[" + i + "]", result);
        }
      }
      return result;
    }
    
    var keys = Object.keys(obj);
    if (keys.length === 0) {
      result[prefix] = {};
    } else {
      for (var j = 0; j < keys.length; j++) {
        var key = keys[j];
        var newPrefix = prefix ? prefix + "." + key : key;
        flatten(obj[key], newPrefix, result);
      }
    }
    
    return result;
  }
  
  var flattened = flatten(obj);
  state.text = JSON.stringify(flattened, null, 2);
  state.postInfo("Flattened " + Object.keys(flattened).length + " paths");
}

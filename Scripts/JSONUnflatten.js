/**
  {
    "api": 1,
    "name": "JSON Unflatten",
    "description": "Unflattens dot notation back to nested JSON",
    "author": "Boop",
    "icon": "square.stack.3d.up.badge.a",
    "tags": "json,unflatten,nested,dot,notation"
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
  
  function unflatten(data) {
    var result = {};
    
    for (var flatKey in data) {
      var keys = flatKey.replace(/\[(\d+)\]/g, ".$1").split(".");
      var current = result;
      
      for (var i = 0; i < keys.length - 1; i++) {
        var key = keys[i];
        var nextKey = keys[i + 1];
        var isNextArray = /^\d+$/.test(nextKey);
        
        if (!(key in current)) {
          current[key] = isNextArray ? [] : {};
        }
        current = current[key];
      }
      
      var lastKey = keys[keys.length - 1];
      current[lastKey] = data[flatKey];
    }
    
    return result;
  }
  
  var unflattened = unflatten(obj);
  state.text = JSON.stringify(unflattened, null, 2);
  state.postInfo("JSON unflattened");
}

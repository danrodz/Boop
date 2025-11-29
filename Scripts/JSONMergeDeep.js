/**
  {
    "api": 1,
    "name": "JSON Deep Merge",
    "description": "Deep merges two JSON objects (separate with ---)",
    "author": "Boop",
    "icon": "arrow.triangle.merge",
    "tags": "json,merge,deep,combine,objects"
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
  
  function isObject(item) {
    return item && typeof item === "object" && !Array.isArray(item);
  }
  
  function deepMerge(target, source) {
    var output = Object.assign({}, target);
    
    if (isObject(target) && isObject(source)) {
      Object.keys(source).forEach(function(key) {
        if (isObject(source[key])) {
          if (!(key in target)) {
            Object.assign(output, { [key]: source[key] });
          } else {
            output[key] = deepMerge(target[key], source[key]);
          }
        } else if (Array.isArray(source[key]) && Array.isArray(target[key])) {
          // Merge arrays by concatenating
          output[key] = target[key].concat(source[key]);
        } else {
          Object.assign(output, { [key]: source[key] });
        }
      });
    }
    
    return output;
  }
  
  var merged = deepMerge(obj1, obj2);
  state.text = JSON.stringify(merged, null, 2);
  state.postInfo("Objects merged");
}

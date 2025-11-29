/**
  {
    "api": 1,
    "name": "Query String Builder",
    "description": "Builds URL query string from key=value pairs",
    "author": "Boop",
    "icon": "link",
    "tags": "url,query,string,build,encode"
  }
**/

function main(state) {
  var lines = state.text.trim().split("\n");
  var params = [];
  
  // Support both JSON and key=value format
  var text = state.text.trim();
  if (text.startsWith("{")) {
    try {
      var obj = JSON.parse(text);
      for (var key in obj) {
        var value = obj[key];
        if (Array.isArray(value)) {
          value.forEach(function(v) {
            params.push(encodeURIComponent(key) + "=" + encodeURIComponent(v));
          });
        } else if (value !== null && value !== undefined) {
          params.push(encodeURIComponent(key) + "=" + encodeURIComponent(value));
        }
      }
    } catch (e) {
      state.postError("Invalid JSON: " + e.message);
      return;
    }
  } else {
    // Parse key=value format
    lines.forEach(function(line) {
      line = line.trim();
      if (!line || line.startsWith("#")) return;
      
      var eqIdx = line.indexOf("=");
      if (eqIdx > -1) {
        var key = line.substring(0, eqIdx).trim();
        var value = line.substring(eqIdx + 1).trim();
        // Remove surrounding quotes if present
        if ((value.startsWith('"') && value.endsWith('"')) ||
            (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1);
        }
        params.push(encodeURIComponent(key) + "=" + encodeURIComponent(value));
      }
    });
  }
  
  if (params.length === 0) {
    state.postError("No parameters found");
    return;
  }
  
  state.text = "?" + params.join("&");
  state.postInfo("Built query string with " + params.length + " parameter(s)");
}

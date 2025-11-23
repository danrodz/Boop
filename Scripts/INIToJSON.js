/**
  {
    "api": 1,
    "name": "INI to JSON",
    "description": "Converts INI file format to JSON",
    "author": "Boop",
    "icon": "doc.text",
    "tags": "ini,json,config,parse,convert"
  }
**/

function main(state) {
  var lines = state.text.split("\n");
  var result = {};
  var currentSection = null;
  
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i].trim();
    
    // Skip empty lines and comments
    if (!line || line.startsWith(";") || line.startsWith("#")) {
      continue;
    }
    
    // Section header
    var sectionMatch = line.match(/^\[([^\]]+)\]$/);
    if (sectionMatch) {
      currentSection = sectionMatch[1];
      result[currentSection] = result[currentSection] || {};
      continue;
    }
    
    // Key-value pair
    var eqIndex = line.indexOf("=");
    if (eqIndex > -1) {
      var key = line.substring(0, eqIndex).trim();
      var value = line.substring(eqIndex + 1).trim();
      
      // Remove quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      
      // Try to parse as number or boolean
      if (value === "true") value = true;
      else if (value === "false") value = false;
      else if (/^-?\d+$/.test(value)) value = parseInt(value);
      else if (/^-?\d+\.\d+$/.test(value)) value = parseFloat(value);
      
      if (currentSection) {
        result[currentSection][key] = value;
      } else {
        result[key] = value;
      }
    }
  }
  
  state.text = JSON.stringify(result, null, 2);
  state.postInfo("INI converted to JSON");
}

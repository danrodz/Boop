/**
  {
    "api": 1,
    "name": "Parse .env to JSON",
    "description": "Parses .env file format to JSON object",
    "author": "Boop",
    "icon": "doc.text",
    "tags": "env,environment,parse,dotenv,config"
  }
**/

function main(state) {
  var lines = state.text.split("\n");
  var result = {};
  var errors = [];
  
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i].trim();
    
    // Skip empty lines and comments
    if (!line || line[0] === "#") continue;
    
    var eqIndex = line.indexOf("=");
    if (eqIndex === -1) {
      errors.push("Line " + (i + 1) + ": Missing '=' in: " + line);
      continue;
    }
    
    var key = line.substring(0, eqIndex).trim();
    var value = line.substring(eqIndex + 1).trim();
    
    // Validate key (must be valid identifier)
    if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(key)) {
      errors.push("Line " + (i + 1) + ": Invalid key: " + key);
      continue;
    }
    
    // Handle quoted values
    if ((value[0] === '"' && value[value.length - 1] === '"') ||
        (value[0] === "'" && value[value.length - 1] === "'")) {
      value = value.slice(1, -1);
      // Handle escape sequences in double quotes
      if (value[0] === '"') {
        value = value.replace(/\\n/g, "\n").replace(/\\t/g, "\t").replace(/\\"/g, '"');
      }
    }
    
    result[key] = value;
  }
  
  var output = JSON.stringify(result, null, 2);
  if (errors.length > 0) {
    output += "\n\n// Warnings:\n// " + errors.join("\n// ");
  }
  
  state.text = output;
  state.postInfo("Parsed " + Object.keys(result).length + " variables");
}

/**
  {
    "api": 1,
    "name": "List Functions",
    "description": "Extracts all function/method signatures from code",
    "author": "Boop",
    "icon": "function",
    "tags": "function,method,list,signature,extract"
  }
**/

function main(state) {
  var code = state.text;
  var functions = [];
  
  // JavaScript/TypeScript functions
  var patterns = [
    // function declarations
    /(?:export\s+)?(?:async\s+)?function\s+(\w+)\s*(<[^>]*>)?\s*\(([^)]*)\)(?:\s*:\s*([^\s{]+))?/g,
    // Arrow functions assigned to const/let/var
    /(?:export\s+)?(?:const|let|var)\s+(\w+)\s*(?::\s*[^=]+)?\s*=\s*(?:async\s+)?(?:<[^>]*>\s*)?\(([^)]*)\)\s*(?::\s*([^\s=]+))?\s*=>/g,
    // Class methods
    /(?:public|private|protected|static|async|\s)*(\w+)\s*(<[^>]*>)?\s*\(([^)]*)\)(?:\s*:\s*([^\s{]+))?\s*\{/g,
    // Object methods
    /(\w+)\s*:\s*(?:async\s+)?function\s*\(([^)]*)\)/g
  ];
  
  patterns.forEach(function(pattern) {
    var match;
    while ((match = pattern.exec(code)) !== null) {
      var name = match[1];
      // Skip common keywords
      if (["if", "for", "while", "switch", "catch", "function", "return", "new"].indexOf(name) > -1) continue;
      
      var params = (match[3] || match[2] || "").trim();
      var returnType = match[4] || "";
      
      // Simplify params
      params = params.replace(/\s+/g, " ").replace(/\n/g, "");
      
      functions.push({
        name: name,
        params: params,
        returnType: returnType,
        signature: name + "(" + params + ")" + (returnType ? ": " + returnType : "")
      });
    }
  });
  
  // Python functions
  var pyPattern = /def\s+(\w+)\s*\(([^)]*)\)(?:\s*->\s*(\w+))?/g;
  var match;
  while ((match = pyPattern.exec(code)) !== null) {
    functions.push({
      name: match[1],
      params: match[2].trim(),
      returnType: match[3] || "",
      signature: match[1] + "(" + match[2].trim() + ")" + (match[3] ? " -> " + match[3] : "")
    });
  }
  
  // Deduplicate
  var seen = {};
  functions = functions.filter(function(f) {
    if (seen[f.signature]) return false;
    seen[f.signature] = true;
    return true;
  });
  
  if (functions.length === 0) {
    state.postError("No functions found");
    return;
  }
  
  // Sort alphabetically
  functions.sort(function(a, b) { return a.name.localeCompare(b.name); });
  
  state.text = "Found " + functions.length + " function(s):\n\n" + 
               functions.map(function(f) { return f.signature; }).join("\n");
  state.postInfo("Found " + functions.length + " function(s)");
}

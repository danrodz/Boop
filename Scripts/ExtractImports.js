/**
  {
    "api": 1,
    "name": "Extract Imports",
    "description": "Extracts and organizes import statements from JS/TS code",
    "author": "Boop",
    "icon": "arrow.down.doc",
    "tags": "import,extract,javascript,typescript,dependencies"
  }
**/

function main(state) {
  var code = state.text;
  
  var imports = {
    npm: [],
    relative: [],
    absolute: []
  };
  
  // Match ES6 imports
  var es6Pattern = /import\s+(?:(?:\{[^}]*\}|\*\s+as\s+\w+|\w+)(?:\s*,\s*(?:\{[^}]*\}|\*\s+as\s+\w+|\w+))*\s+from\s+)?['"]([^'"]+)['"]/g;
  
  // Match CommonJS require
  var cjsPattern = /(?:const|let|var)\s+(?:\{[^}]*\}|\w+)\s*=\s*require\s*\(\s*['"]([^'"]+)['"]\s*\)/g;
  
  var match;
  var allImports = [];
  
  while ((match = es6Pattern.exec(code)) !== null) {
    allImports.push({ statement: match[0], module: match[1] });
  }
  
  while ((match = cjsPattern.exec(code)) !== null) {
    allImports.push({ statement: match[0], module: match[1] });
  }
  
  allImports.forEach(function(imp) {
    var module = imp.module;
    
    if (module.startsWith("./") || module.startsWith("../")) {
      imports.relative.push(imp);
    } else if (module.startsWith("/") || module.startsWith("@/") || module.startsWith("~")) {
      imports.absolute.push(imp);
    } else {
      imports.npm.push(imp);
    }
  });
  
  var output = [];
  
  if (imports.npm.length > 0) {
    output.push("// NPM packages (" + imports.npm.length + ")");
    imports.npm.sort(function(a, b) { return a.module.localeCompare(b.module); });
    imports.npm.forEach(function(imp) { output.push(imp.statement); });
    output.push("");
  }
  
  if (imports.absolute.length > 0) {
    output.push("// Absolute imports (" + imports.absolute.length + ")");
    imports.absolute.sort(function(a, b) { return a.module.localeCompare(b.module); });
    imports.absolute.forEach(function(imp) { output.push(imp.statement); });
    output.push("");
  }
  
  if (imports.relative.length > 0) {
    output.push("// Relative imports (" + imports.relative.length + ")");
    imports.relative.sort(function(a, b) { return a.module.localeCompare(b.module); });
    imports.relative.forEach(function(imp) { output.push(imp.statement); });
  }
  
  if (output.length === 0) {
    state.postError("No imports found");
    return;
  }
  
  state.text = output.join("\n");
  state.postInfo("Found " + allImports.length + " imports");
}

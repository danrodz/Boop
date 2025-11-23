/**
  {
    "api": 1,
    "name": "Generate TypeScript Type Guard",
    "description": "Generates type guard function from TypeScript interface",
    "author": "Boop",
    "icon": "shield",
    "tags": "typescript,type,guard,generate,interface"
  }
**/

function main(state) {
  var code = state.text;
  
  // Extract interface name and body
  var interfaceMatch = code.match(/interface\s+(\w+)\s*\{([^}]+)\}/);
  
  if (!interfaceMatch) {
    state.postError("No interface found. Format: interface Name { ... }");
    return;
  }
  
  var name = interfaceMatch[1];
  var body = interfaceMatch[2];
  
  // Parse properties
  var props = [];
  var propPattern = /(\w+)(\?)?:\s*([^;,\n]+)/g;
  var match;
  
  while ((match = propPattern.exec(body)) !== null) {
    props.push({
      name: match[1],
      optional: !!match[2],
      type: match[3].trim()
    });
  }
  
  // Generate type guard
  var checks = [];
  
  props.forEach(function(prop) {
    var check;
    var accessor = 'obj.' + prop.name;
    var typeCheck;
    
    // Map TypeScript types to typeof checks
    var type = prop.type.replace(/\s/g, "");
    
    if (type === "string") {
      typeCheck = 'typeof ' + accessor + ' === "string"';
    } else if (type === "number") {
      typeCheck = 'typeof ' + accessor + ' === "number"';
    } else if (type === "boolean") {
      typeCheck = 'typeof ' + accessor + ' === "boolean"';
    } else if (type === "string[]" || type === "Array<string>") {
      typeCheck = 'Array.isArray(' + accessor + ') && ' + accessor + '.every(item => typeof item === "string")';
    } else if (type === "number[]" || type === "Array<number>") {
      typeCheck = 'Array.isArray(' + accessor + ') && ' + accessor + '.every(item => typeof item === "number")';
    } else if (type.endsWith("[]") || type.startsWith("Array<")) {
      typeCheck = 'Array.isArray(' + accessor + ')';
    } else if (type === "object" || type === "Record<string,any>") {
      typeCheck = 'typeof ' + accessor + ' === "object" && ' + accessor + ' !== null';
    } else if (type === "any" || type === "unknown") {
      typeCheck = accessor + ' !== undefined';
    } else if (type === "null") {
      typeCheck = accessor + ' === null';
    } else if (type === "undefined") {
      typeCheck = accessor + ' === undefined';
    } else if (type.indexOf("|") > -1) {
      // Union type - basic handling
      typeCheck = accessor + ' !== undefined';
    } else {
      // Assume it is another interface - nested check
      typeCheck = 'typeof ' + accessor + ' === "object"';
    }
    
    if (prop.optional) {
      check = '(' + accessor + ' === undefined || ' + typeCheck + ')';
    } else {
      check = typeCheck;
    }
    
    checks.push(check);
  });
  
  var guardCode = [
    "function is" + name + "(obj: unknown): obj is " + name + " {",
    "  return (",
    "    typeof obj === 'object' &&",
    "    obj !== null &&",
    "    " + checks.join(" &&\n    "),
    "  );",
    "}",
    "",
    "// Usage:",
    "// if (is" + name + "(data)) {",
    "//   // data is now typed as " + name,
    "// }"
  ];
  
  state.text = guardCode.join("\n");
  state.postInfo("Generated type guard for " + name);
}

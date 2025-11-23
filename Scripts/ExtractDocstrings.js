/**
  {
    "api": 1,
    "name": "Extract Docstrings",
    "description": "Extracts documentation comments from code",
    "author": "Boop",
    "icon": "doc.text",
    "tags": "docstring,jsdoc,comment,extract,documentation"
  }
**/

function main(state) {
  var code = state.text;
  var docs = [];
  
  // JSDoc comments /** ... */
  var jsdocPattern = /\/\*\*[\s\S]*?\*\//g;
  var match;
  
  while ((match = jsdocPattern.exec(code)) !== null) {
    var comment = match[0];
    var nextLine = code.slice(match.index + comment.length).match(/^\s*(?:export\s+)?(?:async\s+)?(?:function|class|const|let|var|interface|type)\s+(\w+)/);
    
    var doc = {
      comment: comment,
      raw: comment.replace(/\/\*\*|\*\/|\n\s*\*/g, "\n").trim()
    };
    
    if (nextLine) {
      doc.target = nextLine[1];
    }
    
    // Extract @param, @returns, etc.
    var params = comment.match(/@param\s+\{?([^}]*)\}?\s+(\w+)\s*[-–]?\s*(.*)/g);
    if (params) {
      doc.params = params.map(function(p) {
        var m = p.match(/@param\s+\{?([^}]*)\}?\s+(\w+)\s*[-–]?\s*(.*)/);
        return { type: m[1], name: m[2], desc: m[3] };
      });
    }
    
    var returns = comment.match(/@returns?\s+\{?([^}]*)\}?\s*(.*)/);
    if (returns) {
      doc.returns = { type: returns[1], desc: returns[2] };
    }
    
    docs.push(doc);
  }
  
  // Python docstrings """...""" or '''...'''
  var pyPattern = /(?:def|class)\s+(\w+)[^:]*:\s*\n\s*(["']{3})([\s\S]*?)\2/g;
  while ((match = pyPattern.exec(code)) !== null) {
    docs.push({
      target: match[1],
      comment: match[3].trim(),
      raw: match[3].trim()
    });
  }
  
  if (docs.length === 0) {
    state.postError("No documentation comments found");
    return;
  }
  
  var output = docs.map(function(doc, idx) {
    var lines = ["=== Doc " + (idx + 1) + (doc.target ? " (" + doc.target + ")" : "") + " ==="];
    lines.push(doc.raw);
    
    if (doc.params && doc.params.length > 0) {
      lines.push("\nParameters:");
      doc.params.forEach(function(p) {
        lines.push("  " + p.name + " (" + p.type + "): " + p.desc);
      });
    }
    
    if (doc.returns) {
      lines.push("\nReturns (" + doc.returns.type + "): " + doc.returns.desc);
    }
    
    return lines.join("\n");
  });
  
  state.text = output.join("\n\n");
  state.postInfo("Extracted " + docs.length + " docstring(s)");
}

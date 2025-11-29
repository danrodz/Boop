/**
  {
    "api": 1,
    "name": "Clean Stack Trace",
    "description": "Cleans and simplifies stack traces (removes node_modules, etc.)",
    "author": "Boop",
    "icon": "text.alignleft",
    "tags": "stack,trace,error,clean,debug"
  }
**/

function main(state) {
  var lines = state.text.split("\n");
  var cleaned = [];
  var removed = 0;
  
  // Patterns to filter out
  var filterPatterns = [
    /node_modules/,
    /internal\/modules/,
    /internal\/process/,
    /webpack\/bootstrap/,
    /webpack-internal/,
    /__webpack_require__/,
    /Module\.runMain/,
    /Module\._compile/,
    /Module\.load/,
    /Function\.Module/,
    /at Module\./,
    /at Object\.<anonymous>/,
    /at __webpack_exports__/,
    /at processTicksAndRejections/,
    /at new Promise \(<anonymous>\)/,
    /at Generator\.next \(<anonymous>\)/
  ];
  
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    var shouldFilter = false;
    
    for (var j = 0; j < filterPatterns.length; j++) {
      if (filterPatterns[j].test(line)) {
        shouldFilter = true;
        removed++;
        break;
      }
    }
    
    if (!shouldFilter) {
      // Clean up the line - shorten paths
      var cleanLine = line
        .replace(/\s+at\s+/g, "at ")
        .replace(/\([^)]+[\/\\]([^\/\\]+:\d+:\d+)\)/g, "($1)")
        .trim();
      
      if (cleanLine) {
        cleaned.push(cleanLine);
      }
    }
  }
  
  state.text = cleaned.join("\n");
  state.postInfo("Removed " + removed + " framework/library lines");
}

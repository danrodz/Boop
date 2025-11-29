/**
  {
    "api": 1,
    "name": "Analyze package.json",
    "description": "Summarizes package.json with dependency analysis",
    "author": "Boop",
    "icon": "shippingbox",
    "tags": "npm,package,json,analyze,dependencies"
  }
**/

function main(state) {
  var pkg;
  try {
    pkg = JSON.parse(state.text);
  } catch (e) {
    state.postError("Invalid JSON: " + e.message);
    return;
  }
  
  var deps = pkg.dependencies || {};
  var devDeps = pkg.devDependencies || {};
  var peerDeps = pkg.peerDependencies || {};
  var optDeps = pkg.optionalDependencies || {};
  
  var depCount = Object.keys(deps).length;
  var devDepCount = Object.keys(devDeps).length;
  var peerDepCount = Object.keys(peerDeps).length;
  var optDepCount = Object.keys(optDeps).length;
  var totalDeps = depCount + devDepCount + peerDepCount + optDepCount;
  
  // Categorize dependencies
  function categorize(deps) {
    var categories = {
      framework: [],
      testing: [],
      build: [],
      linting: [],
      types: [],
      utility: [],
      other: []
    };
    
    var patterns = {
      framework: /^(react|vue|angular|svelte|next|nuxt|express|fastify|koa|nest)/i,
      testing: /^(jest|mocha|chai|cypress|playwright|vitest|testing-library)/i,
      build: /^(webpack|vite|rollup|esbuild|parcel|babel|typescript|tsup)/i,
      linting: /^(eslint|prettier|stylelint|lint-staged|husky)/i,
      types: /^@types\//
    };
    
    Object.keys(deps).forEach(function(name) {
      var found = false;
      for (var cat in patterns) {
        if (patterns[cat].test(name)) {
          categories[cat].push(name + "@" + deps[name]);
          found = true;
          break;
        }
      }
      if (!found) {
        if (name.startsWith("@")) {
          categories.utility.push(name + "@" + deps[name]);
        } else {
          categories.other.push(name + "@" + deps[name]);
        }
      }
    });
    
    return categories;
  }
  
  var allDeps = Object.assign({}, deps, devDeps);
  var cats = categorize(allDeps);
  
  var output = [
    "=== " + (pkg.name || "Package") + " ===",
    "Version: " + (pkg.version || "N/A"),
    "License: " + (pkg.license || "N/A"),
    "Description: " + (pkg.description || "N/A"),
    "",
    "=== DEPENDENCIES SUMMARY ===",
    "Production: " + depCount,
    "Development: " + devDepCount,
    "Peer: " + peerDepCount,
    "Optional: " + optDepCount,
    "Total: " + totalDeps,
    ""
  ];
  
  if (pkg.scripts) {
    output.push("=== SCRIPTS ===");
    Object.keys(pkg.scripts).forEach(function(name) {
      output.push("  " + name + ": " + pkg.scripts[name].substring(0, 60) + (pkg.scripts[name].length > 60 ? "..." : ""));
    });
    output.push("");
  }
  
  output.push("=== DEPENDENCY CATEGORIES ===");
  for (var cat in cats) {
    if (cats[cat].length > 0) {
      output.push(cat.charAt(0).toUpperCase() + cat.slice(1) + " (" + cats[cat].length + "):");
      cats[cat].slice(0, 10).forEach(function(d) {
        output.push("  - " + d);
      });
      if (cats[cat].length > 10) {
        output.push("  ... and " + (cats[cat].length - 10) + " more");
      }
    }
  }
  
  state.text = output.join("\n");
  state.postInfo(totalDeps + " total dependencies");
}

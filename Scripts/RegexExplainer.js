/**
  {
    "api": 1,
    "name": "Regex Explainer",
    "description": "Explains regular expressions in plain English",
    "author": "Boop",
    "icon": "text.magnifyingglass",
    "tags": "regex,regular,expression,explain,learn"
  }
**/

function main(state) {
  var regex = state.text.trim();
  var explanations = [];
  var i = 0;
  
  var charClasses = {
    "\\d": "any digit (0-9)",
    "\\D": "any non-digit",
    "\\w": "any word character (a-z, A-Z, 0-9, _)",
    "\\W": "any non-word character",
    "\\s": "any whitespace (space, tab, newline)",
    "\\S": "any non-whitespace",
    "\\b": "word boundary",
    "\\B": "non-word boundary",
    "\\n": "newline",
    "\\r": "carriage return",
    "\\t": "tab",
    ".": "any character except newline"
  };
  
  function explain(char, context) {
    if (charClasses[char]) return charClasses[char];
    if (char === "^") return context === "start" ? "start of string" : "NOT";
    if (char === "$") return "end of string";
    return "literal '" + char + "'";
  }
  
  while (i < regex.length) {
    var char = regex[i];
    var next = regex[i + 1];
    var segment = "";
    var desc = "";
    
    // Handle escape sequences
    if (char === "\\") {
      segment = regex.substr(i, 2);
      desc = charClasses[segment] || "literal '" + next + "'";
      i += 2;
    }
    // Character classes
    else if (char === "[") {
      var end = regex.indexOf("]", i);
      segment = regex.substring(i, end + 1);
      var inner = segment.slice(1, -1);
      var negated = inner[0] === "^";
      if (negated) inner = inner.slice(1);
      desc = (negated ? "any character NOT in: " : "any character in: ") + inner;
      i = end + 1;
    }
    // Groups
    else if (char === "(") {
      var depth = 1;
      var j = i + 1;
      while (j < regex.length && depth > 0) {
        if (regex[j] === "(") depth++;
        if (regex[j] === ")") depth--;
        j++;
      }
      segment = regex.substring(i, j);
      var inner = segment.slice(1, -1);
      if (inner.startsWith("?:")) {
        desc = "non-capturing group: " + inner.slice(2);
      } else if (inner.startsWith("?=")) {
        desc = "positive lookahead: " + inner.slice(2);
      } else if (inner.startsWith("?!")) {
        desc = "negative lookahead: " + inner.slice(2);
      } else if (inner.startsWith("?<=")) {
        desc = "positive lookbehind: " + inner.slice(3);
      } else if (inner.startsWith("?<!")) {
        desc = "negative lookbehind: " + inner.slice(3);
      } else {
        desc = "capturing group: " + inner;
      }
      i = j;
    }
    // Quantifiers
    else if (char === "{") {
      var end = regex.indexOf("}", i);
      segment = regex.substring(i, end + 1);
      var nums = segment.slice(1, -1).split(",");
      if (nums.length === 1) {
        desc = "exactly " + nums[0] + " times";
      } else if (nums[1] === "") {
        desc = nums[0] + " or more times";
      } else {
        desc = "between " + nums[0] + " and " + nums[1] + " times";
      }
      i = end + 1;
    }
    else if (char === "*") {
      desc = "zero or more times" + (next === "?" ? " (lazy)" : " (greedy)");
      segment = char + (next === "?" ? "?" : "");
      i += segment.length;
    }
    else if (char === "+") {
      desc = "one or more times" + (next === "?" ? " (lazy)" : " (greedy)");
      segment = char + (next === "?" ? "?" : "");
      i += segment.length;
    }
    else if (char === "?") {
      desc = "zero or one time (optional)";
      segment = char;
      i++;
    }
    else if (char === "|") {
      desc = "OR";
      segment = char;
      i++;
    }
    else if (char === "^") {
      desc = i === 0 ? "start of string" : "literal '^'";
      segment = char;
      i++;
    }
    else if (char === "$") {
      desc = "end of string";
      segment = char;
      i++;
    }
    else if (char === ".") {
      desc = "any character except newline";
      segment = char;
      i++;
    }
    else {
      segment = char;
      desc = "literal '" + char + "'";
      i++;
    }
    
    explanations.push("  " + segment.padEnd(12) + " " + desc);
  }
  
  state.text = "Regex: " + regex + "\n\nBreakdown:\n" + explanations.join("\n");
  state.postInfo("Regex explained");
}

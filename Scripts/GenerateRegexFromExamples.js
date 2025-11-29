/**
  {
    "api": 1,
    "name": "Generate Regex from Examples",
    "description": "Attempts to generate regex pattern from example strings",
    "author": "Boop",
    "icon": "text.magnifyingglass",
    "tags": "regex,generate,pattern,examples,match"
  }
**/

function main(state) {
  var examples = state.text.trim().split("\n").filter(function(l) { return l.trim().length > 0; });
  
  if (examples.length === 0) {
    state.postError("Enter example strings, one per line");
    return;
  }
  
  function analyzeChar(chars) {
    var hasDigit = chars.some(function(c) { return /\d/.test(c); });
    var hasLower = chars.some(function(c) { return /[a-z]/.test(c); });
    var hasUpper = chars.some(function(c) { return /[A-Z]/.test(c); });
    
    var unique = Array.from(new Set(chars));
    
    if (unique.length === 1) {
      var c = unique[0];
      if (/[.*+?^$|\\[\](){}]/.test(c)) return "\\" + c;
      return c;
    }
    
    if (unique.every(function(c) { return /\d/.test(c); })) return "\\d";
    
    if (unique.every(function(c) { return /[a-zA-Z]/.test(c); })) {
      if (hasLower && !hasUpper) return "[a-z]";
      if (hasUpper && !hasLower) return "[A-Z]";
      return "[a-zA-Z]";
    }
    
    if (unique.every(function(c) { return /\w/.test(c); })) return "\\w";
    
    return ".";
  }
  
  var lengths = examples.map(function(e) { return e.length; });
  var minLen = Math.min.apply(null, lengths);
  var maxLen = Math.max.apply(null, lengths);
  var sameLength = minLen === maxLen;
  
  var pattern = [];
  
  for (var i = 0; i < minLen; i++) {
    var charsAtPos = examples.map(function(e) { return e[i]; });
    pattern.push(analyzeChar(charsAtPos));
  }
  
  var regexStr = pattern.join("");
  
  if (!sameLength && pattern.length > 0) {
    var lastChar = pattern[pattern.length - 1];
    regexStr = pattern.slice(0, -1).join("") + lastChar + "+";
  }
  
  var commonPrefix = examples.reduce(function(a, b) {
    var i = 0;
    while (i < a.length && i < b.length && a[i] === b[i]) i++;
    return a.substring(0, i);
  });
  
  var reversedExamples = examples.map(function(e) { return e.split("").reverse().join(""); });
  var commonSuffixRev = reversedExamples.reduce(function(a, b) {
    var i = 0;
    while (i < a.length && i < b.length && a[i] === b[i]) i++;
    return a.substring(0, i);
  });
  var commonSuffix = commonSuffixRev.split("").reverse().join("");
  
  function escapeRegex(str) {
    return str.replace(/[.*+?^$|\\[\](){}]/g, "\\$&");
  }
  
  var improvedPattern = "^" + regexStr + "$";
  
  if (commonPrefix.length > 0 || commonSuffix.length > 0) {
    var middle = ".+";
    improvedPattern = "^" + escapeRegex(commonPrefix) + middle + escapeRegex(commonSuffix) + "$";
  }
  
  var testRegex;
  try {
    testRegex = new RegExp(improvedPattern);
  } catch (e) {
    testRegex = null;
  }
  
  var matchCount = testRegex ? examples.filter(function(e) { return testRegex.test(e); }).length : 0;
  
  var output = [
    "=== GENERATED PATTERNS ===",
    "",
    "Basic Pattern: /" + regexStr + "/",
    "Anchored: /" + improvedPattern + "/",
    "",
    "=== ANALYSIS ===",
    "Examples analyzed: " + examples.length,
    "Length range: " + minLen + " - " + maxLen,
    "Common prefix: \"" + commonPrefix + "\"",
    "Common suffix: \"" + commonSuffix + "\"",
    "Pattern matches: " + matchCount + "/" + examples.length,
    "",
    "=== EXAMPLES ===",
    examples.slice(0, 5).join("\n") + (examples.length > 5 ? "\n..." : ""),
    "",
    "Note: Generated patterns are approximations. Test thoroughly before use."
  ];
  
  state.text = output.join("\n");
  state.postInfo("Pattern generated, matches " + matchCount + "/" + examples.length);
}

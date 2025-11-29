/**
  {
    "api": 1,
    "name": "Character Frequency",
    "description": "Counts frequency of each character",
    "author": "Boop",
    "icon": "chart.bar",
    "tags": "character,frequency,count,statistics,analyze"
  }
**/

function main(state) {
  var freq = {};
  for (var i = 0; i < state.text.length; i++) {
    var char = state.text[i];
    freq[char] = (freq[char] || 0) + 1;
  }
  
  var entries = [];
  for (var key in freq) {
    entries.push([key, freq[key]]);
  }
  entries.sort(function(a, b) { return b[1] - a[1]; });
  
  var result = entries.map(function(e) {
    var char = e[0];
    var display = char === "\n" ? "\\n" : char === "\t" ? "\\t" : char === " " ? "(space)" : char;
    return e[1] + "\t" + display;
  });
  
  state.text = result.join("\n");
  state.postInfo("Found " + entries.length + " unique characters");
}

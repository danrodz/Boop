/**
  {
    "api": 1,
    "name": "Word Frequency",
    "description": "Counts frequency of each word",
    "author": "Boop",
    "icon": "chart.bar",
    "tags": "word,frequency,count,statistics,analyze"
  }
**/

function main(state) {
  var words = state.text.toLowerCase().match(/\b[a-z]+\b/g);
  
  if (!words || words.length === 0) {
    state.postError("No words found");
    return;
  }
  
  var freq = {};
  for (var i = 0; i < words.length; i++) {
    var word = words[i];
    freq[word] = (freq[word] || 0) + 1;
  }
  
  var entries = [];
  for (var key in freq) {
    entries.push([key, freq[key]]);
  }
  entries.sort(function(a, b) { return b[1] - a[1]; });
  
  var result = entries.map(function(e) { return e[1] + "\t" + e[0]; });
  
  state.text = result.join("\n");
  state.postInfo("Found " + entries.length + " unique words");
}

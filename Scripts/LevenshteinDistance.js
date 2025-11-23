/**
  {
    "api": 1,
    "name": "String Similarity",
    "description": "Calculates Levenshtein distance and similarity (separate strings with ---)",
    "author": "Boop",
    "icon": "equal.square",
    "tags": "levenshtein,distance,similarity,compare,fuzzy"
  }
**/

function main(state) {
  var parts = state.text.split(/^---$/m);
  if (parts.length !== 2) {
    state.postError("Separate two strings with --- on its own line");
    return;
  }
  
  var s1 = parts[0].trim();
  var s2 = parts[1].trim();
  
  // Calculate Levenshtein distance
  var m = s1.length;
  var n = s2.length;
  var dp = [];
  
  for (var i = 0; i <= m; i++) {
    dp[i] = [i];
    for (var j = 1; j <= n; j++) {
      if (i === 0) {
        dp[i][j] = j;
      } else {
        var cost = s1[i-1] === s2[j-1] ? 0 : 1;
        dp[i][j] = Math.min(
          dp[i-1][j] + 1,      // deletion
          dp[i][j-1] + 1,      // insertion
          dp[i-1][j-1] + cost  // substitution
        );
      }
    }
  }
  
  var distance = dp[m][n];
  var maxLen = Math.max(m, n);
  var similarity = maxLen === 0 ? 100 : ((1 - distance / maxLen) * 100).toFixed(1);
  
  state.text = "String 1: \"" + s1 + "\" (" + m + " chars)\n" +
               "String 2: \"" + s2 + "\" (" + n + " chars)\n\n" +
               "Levenshtein Distance: " + distance + "\n" +
               "Similarity: " + similarity + "%\n" +
               "Operations needed: " + distance + " edit(s)";
  
  state.postInfo("Distance: " + distance + ", Similarity: " + similarity + "%");
}

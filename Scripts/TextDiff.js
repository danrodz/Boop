/**
  {
    "api": 1,
    "name": "Text Diff",
    "description": "Shows line-by-line differences between two texts (separate with ---)",
    "author": "Boop",
    "icon": "arrow.left.arrow.right",
    "tags": "diff,compare,text,changes,lines"
  }
**/

function main(state) {
  var parts = state.text.split(/^---$/m);
  if (parts.length !== 2) {
    state.postError("Separate two texts with --- on its own line");
    return;
  }
  
  var lines1 = parts[0].trim().split("\n");
  var lines2 = parts[1].trim().split("\n");
  
  // Longest Common Subsequence for diff
  function lcs(a, b) {
    var m = a.length, n = b.length;
    var dp = [];
    for (var i = 0; i <= m; i++) {
      dp[i] = [];
      for (var j = 0; j <= n; j++) {
        if (i === 0 || j === 0) dp[i][j] = 0;
        else if (a[i-1] === b[j-1]) dp[i][j] = dp[i-1][j-1] + 1;
        else dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
      }
    }
    return dp;
  }
  
  function backtrack(dp, a, b, i, j) {
    if (i === 0 && j === 0) return [];
    if (i === 0) return backtrack(dp, a, b, i, j-1).concat([{type: "+", line: b[j-1]}]);
    if (j === 0) return backtrack(dp, a, b, i-1, j).concat([{type: "-", line: a[i-1]}]);
    if (a[i-1] === b[j-1]) return backtrack(dp, a, b, i-1, j-1).concat([{type: " ", line: a[i-1]}]);
    if (dp[i-1][j] > dp[i][j-1]) return backtrack(dp, a, b, i-1, j).concat([{type: "-", line: a[i-1]}]);
    return backtrack(dp, a, b, i, j-1).concat([{type: "+", line: b[j-1]}]);
  }
  
  var dp = lcs(lines1, lines2);
  var diff = backtrack(dp, lines1, lines2, lines1.length, lines2.length);
  
  var added = 0, removed = 0;
  var result = diff.map(function(d) {
    if (d.type === "+") added++;
    if (d.type === "-") removed++;
    return d.type + " " + d.line;
  });
  
  state.text = result.join("\n");
  state.postInfo("+" + added + " additions, -" + removed + " deletions");
}

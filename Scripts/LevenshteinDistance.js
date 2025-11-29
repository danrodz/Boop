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
  try {
    const parts = state.text.split(/^---$/m);
    if (parts.length !== 2) {
      if (typeof state.postError === 'function') {
        state.postError("Separate two strings with --- on its own line");
      }
      return;
    }

    const s1 = parts[0].trim();
    const s2 = parts[1].trim();

    const m = s1.length;
    const n = s2.length;
    const dp = Array(m + 1);

    for (let i = 0; i <= m; i++) {
      dp[i] = Array(n + 1);
      for (let j = 0; j <= n; j++) {
        if (i === 0) {
          dp[i][j] = j;
        } else if (j === 0) {
          dp[i][j] = i;
        } else {
          const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
          dp[i][j] = Math.min(
            dp[i - 1][j] + 1,      // deletion
            dp[i][j - 1] + 1,      // insertion
            dp[i - 1][j - 1] + cost // substitution
          );
        }
      }
    }

    const distance = dp[m][n];
    const maxLen = Math.max(m, n);
    const similarity = maxLen === 0 ? '100.0' : ((1 - distance / maxLen) * 100).toFixed(1);

    state.text =
      'String 1: "' + s1 + '" (' + m + ' chars)\n' +
      'String 2: "' + s2 + '" (' + n + ' chars)\n\n' +
      'Levenshtein Distance: ' + distance + '\n' +
      'Similarity: ' + similarity + '%\n' +
      'Operations needed: ' + distance + ' edit(s)';

    if (typeof state.postInfo === 'function') {
      state.postInfo('Distance: ' + distance + ', Similarity: ' + similarity + '%');
    }
  } catch (error) {
    if (typeof state.postError === 'function') {
      state.postError('Failed to calculate string similarity: ' + error.message);
    }
  }
}

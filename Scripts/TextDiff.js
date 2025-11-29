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
  try {
    const parts = state.text.split(/^---$/m);
    if (parts.length !== 2) {
      if (typeof state.postError === 'function') {
        state.postError("Separate two texts with --- on its own line");
      }
      return;
    }

    const lines1 = parts[0].trim().split('\n');
    const lines2 = parts[1].trim().split('\n');

    function buildLcsTable(a, b) {
      const m = a.length;
      const n = b.length;
      const dp = Array(m + 1);
      for (let i = 0; i <= m; i++) {
        dp[i] = Array(n + 1).fill(0);
      }

      for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
          if (a[i - 1] === b[j - 1]) {
            dp[i][j] = dp[i - 1][j - 1] + 1;
          } else {
            dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
          }
        }
      }
      return dp;
    }

    function buildDiff(dp, a, b) {
      const diff = [];
      let i = a.length;
      let j = b.length;

      while (i > 0 || j > 0) {
        if (i > 0 && j > 0 && a[i - 1] === b[j - 1]) {
          diff.push({ type: ' ', line: a[i - 1] });
          i--;
          j--;
        } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
          diff.push({ type: '+', line: b[j - 1] });
          j--;
        } else if (i > 0 && (j === 0 || dp[i - 1][j] > dp[i][j - 1])) {
          diff.push({ type: '-', line: a[i - 1] });
          i--;
        }
      }

      return diff.reverse();
    }

    const dp = buildLcsTable(lines1, lines2);
    const diff = buildDiff(dp, lines1, lines2);

    let added = 0;
    let removed = 0;

    const result = diff.map(d => {
      if (d.type === '+') added++;
      if (d.type === '-') removed++;
      return d.type + ' ' + d.line;
    });

    state.text = result.join('\n');

    if (typeof state.postInfo === 'function') {
      state.postInfo('+' + added + ' additions, -' + removed + ' deletions');
    }
  } catch (error) {
    if (typeof state.postError === 'function') {
      state.postError('Failed to generate diff: ' + error.message);
    }
  }
}

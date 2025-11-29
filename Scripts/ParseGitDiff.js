/**
  {
    "api": 1,
    "name": "Parse Git Diff Stats",
    "description": "Extract statistics from git diff output",
    "author": "Boop",
    "icon": "info",
    "tags": "git,diff,parse,stats"
  }
**/

function main(state) {
  const diff = state.text;

  const stats = {
    filesChanged: 0,
    insertions: 0,
    deletions: 0,
    files: []
  };

  // Extract file changes
  const fileRegex = /diff --git a\/([^\s]+) b\/([^\s]+)/g;
  let match;
  while ((match = fileRegex.exec(diff)) !== null) {
    stats.filesChanged++;
    stats.files.push(match[1]);
  }

  // Extract insertions/deletions from summary
  const summaryMatch = diff.match(/(\d+)\s+insertions?\(\+\),\s*(\d+)\s+deletions?\(-\)/);
  if (summaryMatch) {
    stats.insertions = parseInt(summaryMatch[1]);
    stats.deletions = parseInt(summaryMatch[2]);
  } else {
    // Count manually
    const lines = diff.split('\n');
    lines.forEach(line => {
      if (line.startsWith('+') && !line.startsWith('+++')) stats.insertions++;
      if (line.startsWith('-') && !line.startsWith('---')) stats.deletions++;
    });
  }

  let output = `Git Diff Statistics:

Files changed: ${stats.filesChanged}
Insertions: ${stats.insertions} (+)
Deletions: ${stats.deletions} (-)
Net change: ${stats.insertions - stats.deletions} lines

Modified files:
${stats.files.map(f => `- ${f}`).join('\n')}`;

  state.text = output;
  state.postInfo("Parsed git diff");
}

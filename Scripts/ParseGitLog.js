/**
  {
    "api": 1,
    "name": "Parse Git Log Stats",
    "description": "Extract statistics from git log output",
    "author": "Boop",
    "icon": "info",
    "tags": "git,log,parse,stats"
  }
**/

function main(state) {
  const log = state.text;
  const lines = log.split('\n');

  const stats = {
    totalCommits: 0,
    authors: {},
    types: {},
    files: {}
  };

  let currentCommit = null;

  lines.forEach(line => {
    // Commit hash
    if (line.startsWith('commit ')) {
      stats.totalCommits++;
      currentCommit = line.substring(7).trim();
    }

    // Author
    const authorMatch = line.match(/^Author:\s*(.+?)\s*</);
    if (authorMatch) {
      const author = authorMatch[1];
      stats.authors[author] = (stats.authors[author] || 0) + 1;
    }

    // Commit type (conventional commits)
    const typeMatch = line.match(/^\s{4}(feat|fix|docs|style|refactor|perf|test|build|ci|chore)[\(:]/);
    if (typeMatch) {
      const type = typeMatch[1];
      stats.types[type] = (stats.types[type] || 0) + 1;
    }
  });

  let output = `Git Log Statistics:\n\n`;
  output += `Total commits: ${stats.totalCommits}\n\n`;

  if (Object.keys(stats.authors).length > 0) {
    output += `Contributors:\n`;
    Object.entries(stats.authors)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .forEach(([author, count]) => {
        output += `- ${author}: ${count} commits\n`;
      });
    output += '\n';
  }

  if (Object.keys(stats.types).length > 0) {
    output += `Commit types:\n`;
    Object.entries(stats.types)
      .sort((a, b) => b[1] - a[1])
      .forEach(([type, count]) => {
        output += `- ${type}: ${count}\n`;
      });
  }

  state.text = output;
  state.postInfo("Parsed git log");
}

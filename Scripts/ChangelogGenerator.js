/**
  {
    "api": 1,
    "name": "Changelog Generator",
    "description": "Generate changelog from commit messages",
    "author": "Boop",
    "icon": "list.bullet.rectangle",
    "tags": "changelog,git,commits,release"
  }
**/

function main(state) {
  try {
    const commits = state.text.split('\n').filter(line => line.trim());

    const categories = {
      feat: { title: 'Features', items: [] },
      fix: { title: 'Bug Fixes', items: [] },
      docs: { title: 'Documentation', items: [] },
      style: { title: 'Style Changes', items: [] },
      refactor: { title: 'Code Refactoring', items: [] },
      perf: { title: 'Performance Improvements', items: [] },
      test: { title: 'Tests', items: [] },
      build: { title: 'Build System', items: [] },
      ci: { title: 'CI/CD', items: [] },
      chore: { title: 'Chores', items: [] },
      other: { title: 'Other Changes', items: [] }
    };

    // Parse commits (conventional commits format)
    for (let commit of commits) {
      const match = commit.match(/^(\w+)(?:\(([^)]+)\))?\s*:\s*(.+)$/);

      if (match) {
        const type = match[1].toLowerCase();
        const scope = match[2];
        const message = match[3];

        const category = categories[type] || categories.other;
        const item = scope ? `**${scope}**: ${message}` : message;
        category.items.push(item);
      } else {
        categories.other.items.push(commit);
      }
    }

    // Generate changelog
    const today = new Date().toISOString().split('T')[0];
    let changelog = `# Changelog\n\n`;
    changelog += `## [Unreleased] - ${today}\n\n`;

    for (let key in categories) {
      const cat = categories[key];
      if (cat.items.length > 0) {
        changelog += `### ${cat.title}\n\n`;
        cat.items.forEach(item => {
          changelog += `- ${item}\n`;
        });
        changelog += '\n';
      }
    }

    state.text = changelog;
  } catch (error) {
    state.postError("Changelog generation failed: " + error.message);
  }
}

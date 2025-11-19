/**
  {
    "api": 1,
    "name": "Git Commit Message",
    "description": "Generate conventional commit message (input: type description)",
    "author": "Boop",
    "icon": "arrow.triangle.branch",
    "tags": "git,commit,conventional,message"
  }
**/

function main(state) {
  const types = {
    feat: 'A new feature',
    fix: 'A bug fix',
    docs: 'Documentation only changes',
    style: 'Changes that do not affect the meaning of the code',
    refactor: 'A code change that neither fixes a bug nor adds a feature',
    perf: 'A code change that improves performance',
    test: 'Adding missing tests or correcting existing tests',
    chore: 'Changes to the build process or auxiliary tools',
    ci: 'Changes to CI configuration files and scripts',
    build: 'Changes that affect the build system or external dependencies',
    revert: 'Reverts a previous commit'
  };

  const input = state.text.trim();

  if (!input) {
    const typeList = Object.entries(types).map(([key, desc]) => `${key}: ${desc}`).join('\n');
    state.text = `Usage: <type> <description>\n\nAvailable types:\n${typeList}\n\nExample: feat add user authentication`;
    return;
  }

  const parts = input.split(/\s+/);
  const type = parts[0].toLowerCase();
  const description = parts.slice(1).join(' ');

  if (!types[type]) {
    state.postError(`Unknown type '${type}'. Use: ${Object.keys(types).join(', ')}`);
    return;
  }

  const message = `${type}: ${description}`;
  state.text = message;
  state.postInfo("Conventional commit message generated");
}

/**
  {
    "api": 1,
    "name": "Format Conventional Commit",
    "description": "Format commit message following Conventional Commits spec",
    "author": "Boop",
    "icon": "doc",
    "tags": "git,commit,conventional,format"
  }
**/

function main(state) {
  const text = state.text.trim();

  const types = {
    'feat': 'A new feature',
    'fix': 'A bug fix',
    'docs': 'Documentation only changes',
    'style': 'Code style changes (formatting, etc)',
    'refactor': 'Code refactoring',
    'perf': 'Performance improvements',
    'test': 'Adding or updating tests',
    'build': 'Build system or dependencies',
    'ci': 'CI configuration changes',
    'chore': 'Other changes'
  };

  if (text === '' || text === 'help' || text === '?') {
    let help = 'Conventional Commit Format:\n\n';
    help += '<type>[optional scope]: <description>\n\n';
    help += '[optional body]\n\n';
    help += '[optional footer(s)]\n\n';
    help += 'Types:\n';
    for (const [type, desc] of Object.entries(types)) {
      help += `- ${type}: ${desc}\n`;
    }
    help += '\nExample:\nfeat(auth): add OAuth2 login\n\nImplemented Google OAuth2 authentication\n\nCloses #123';
    state.text = help;
    return;
  }

  // Simple formatter
  const lines = text.split('\n');
  const subject = lines[0];

  const formatted = `${subject}

${lines.slice(1).join('\n').trim()}

# Conventional Commits format:
# <type>[optional scope]: <description>
#
# Types: feat, fix, docs, style, refactor, perf, test, build, ci, chore`;

  state.text = formatted;
  state.postInfo("Formatted commit message");
}

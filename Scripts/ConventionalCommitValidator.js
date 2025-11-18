/**
  {
    "api": 1,
    "name": "Validate Conventional Commit",
    "description": "Validate commit message follows Conventional Commits format",
    "author": "Boop",
    "icon": "checkmark.shield",
    "tags": "git,commit,conventional,validate"
  }
**/

function main(state) {
  try {
    const message = state.text.trim();

    // Conventional commit format: type(scope): subject
    const pattern = /^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\(.+\))?: .{1,}$/;

    const isValid = pattern.test(message);

    if (isValid) {
      const match = message.match(/^(\w+)(\((.+)\))?: (.+)$/);
      if (match) {
        state.text = `✓ Valid Conventional Commit\n\nType: ${match[1]}\nScope: ${match[3] || 'none'}\nSubject: ${match[4]}`;
      }
    } else {
      let errors = [];

      if (!/^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)/.test(message)) {
        errors.push('- Must start with valid type (feat, fix, docs, etc.)');
      }

      if (!message.includes(':')) {
        errors.push('- Must include colon ":" after type/scope');
      }

      if (message.split(':')[1]?.trim().length < 1) {
        errors.push('- Subject cannot be empty');
      }

      state.text = '✗ Invalid Conventional Commit\n\n' + errors.join('\n');
    }
  } catch (error) {
    state.postError("Validation failed: " + error.message);
  }
}

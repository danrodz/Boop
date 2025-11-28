/**
  {
    "api": 1,
    "name": "Generate Git Commit Template",
    "description": "Generate a git commit message template file",
    "author": "Boop",
    "icon": "doc",
    "tags": "git,commit,template,generate"
  }
**/

function main(state) {
  const template = `# <type>(<scope>): <subject>

# <body>

# <footer>

# Type should be one of the following:
# * feat: A new feature
# * fix: A bug fix
# * docs: Documentation changes
# * style: Code style changes (formatting)
# * refactor: Code refactoring
# * perf: Performance improvements
# * test: Adding tests
# * build: Build system changes
# * ci: CI configuration changes
# * chore: Other changes

# Scope is optional and represents the module/component

# Subject should:
# - Use imperative mood ("add" not "added")
# - Not capitalize first letter
# - Not end with a period

# Body should:
# - Explain what and why (not how)
# - Wrap at 72 characters

# Footer should reference issues:
# - Fixes #123
# - Closes #456
# - Refs #789

# To use this template:
# git config commit.template .gitmessage`;

  state.text = template;
  state.postInfo("Generated commit template");
}

/**
  {
    "api": 1,
    "name": "Generate .dockerignore",
    "description": "Generate common .dockerignore file for various project types",
    "author": "Boop",
    "icon": "doc",
    "tags": "docker,dockerignore,generate,devops"
  }
**/

function main(state) {
  const projectType = state.text.trim().toLowerCase();

  let dockerignore = `# Git
.git
.gitignore
.gitattributes

# CI/CD
.github
.gitlab-ci.yml
.travis.yml
Jenkinsfile

# Documentation
README.md
CHANGELOG.md
LICENSE
*.md

# Development files
.vscode
.idea
*.swp
*.swo
*~

`;

  if (projectType.includes('node') || projectType.includes('javascript') || projectType.includes('js')) {
    dockerignore += `# Node.js
node_modules
npm-debug.log
yarn-error.log
.npm
.yarn

`;
  }

  if (projectType.includes('python') || projectType.includes('py')) {
    dockerignore += `# Python
__pycache__
*.pyc
*.pyo
*.pyd
.Python
venv
env
.env
*.egg-info

`;
  }

  dockerignore += `# Build artifacts
dist
build
*.log

# OS files
.DS_Store
Thumbs.db`;

  state.text = dockerignore;
  state.postInfo("Generated .dockerignore");
}

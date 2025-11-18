/**
  {
    "api": 1,
    "name": "Generate .gitignore",
    "description": "Generate .gitignore file for various project types",
    "author": "Boop",
    "icon": "doc",
    "tags": "git,gitignore,generate,vcs"
  }
**/

function main(state) {
  const projectType = state.text.trim().toLowerCase();

  let gitignore = `# Dependencies
node_modules/
vendor/

# Environment
.env
.env.local
.env.*.local

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

`;

  if (projectType.includes('node') || projectType.includes('javascript') || projectType.includes('js')) {
    gitignore += `# Node.js
node_modules/
npm-debug.log
.npm
.eslintcache
.yarn-integrity

# Build
dist/
build/
.next/
out/

`;
  }

  if (projectType.includes('python') || projectType.includes('py')) {
    gitignore += `# Python
__pycache__/
*.py[cod]
*$py.class
.Python
venv/
env/
ENV/
*.egg-info/
.pytest_cache/
.coverage
htmlcov/

`;
  }

  if (projectType.includes('java')) {
    gitignore += `# Java
*.class
*.jar
*.war
target/
.gradle/
build/

`;
  }

  gitignore += `# Build artifacts
*.o
*.so
*.dylib
*.exe
*.out
*.app`;

  state.text = gitignore;
  state.postInfo("Generated .gitignore");
}

/**
  {
    "api": 1,
    "name": "GitIgnore Generator",
    "description": "Generate .gitignore for specified languages (e.g., 'node', 'python', 'java')",
    "author": "Boop",
    "icon": "doc.badge.gearshape",
    "tags": "git,gitignore,node,python,java,ignore"
  }
**/

function main(state) {
  const templates = {
    node: `# Node
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.npm
.env
.env.local
dist/
build/
*.log`,

    python: `# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
env/
venv/
ENV/
build/
dist/
*.egg-info/
.pytest_cache/
.coverage`,

    java: `# Java
*.class
*.log
*.jar
*.war
*.ear
target/
.gradle/
build/
.idea/
*.iml
.classpath
.project
.settings/`,

    go: `# Go
*.exe
*.exe~
*.dll
*.so
*.dylib
*.test
*.out
vendor/
go.sum`,

    rust: `# Rust
target/
Cargo.lock
**/*.rs.bk
*.pdb`,

    macos: `# macOS
.DS_Store
.AppleDouble
.LSOverride
._*`,

    windows: `# Windows
Thumbs.db
ehthumbs.db
Desktop.ini
$RECYCLE.BIN/`,

    linux: `# Linux
*~
.fuse_hidden*
.directory
.Trash-*`,

    vscode: `# VSCode
.vscode/
*.code-workspace`,

    jetbrains: `# JetBrains
.idea/
*.iml
*.iws
out/`
  };

  const requested = state.text.toLowerCase().split(/[\s,]+/).map(s => s.trim()).filter(s => s);
  const result = [];

  for (const lang of requested) {
    if (templates[lang]) {
      result.push(templates[lang]);
    }
  }

  if (result.length === 0) {
    state.text = Object.keys(templates).join(', ');
    state.postInfo("Available templates: " + Object.keys(templates).join(', '));
  } else {
    state.text = result.join('\n\n');
  }
}

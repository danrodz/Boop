/**
  {
    "api": 1,
    "name": "Generate CODEOWNERS",
    "description": "Generate GitHub/GitLab CODEOWNERS file template",
    "author": "Boop",
    "icon": "doc",
    "tags": "git,github,codeowners,template"
  }
**/

function main(state) {
  const owner = state.text.trim() || '@username';

  const codeowners = `# CODEOWNERS file
# https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners

# Default owner for everything
* ${owner}

# Frontend code
/src/components/ @frontend-team
/src/styles/ @frontend-team

# Backend code
/src/api/ @backend-team
/src/services/ @backend-team

# Database
/migrations/ @database-team
/prisma/ @database-team

# DevOps
/Dockerfile @devops-team
/kubernetes/ @devops-team
/.github/workflows/ @devops-team

# Documentation
/docs/ @docs-team
*.md @docs-team

# Configuration
/.github/ @admin-team
/package.json @admin-team`;

  state.text = codeowners;
  state.postInfo("Generated CODEOWNERS file");
}

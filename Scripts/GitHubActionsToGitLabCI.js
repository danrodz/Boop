/**
  {
    "api": 1,
    "name": "GitHub Actions to GitLab CI",
    "description": "Convert GitHub Actions workflow to GitLab CI YAML",
    "author": "Boop",
    "icon": "gear",
    "tags": "github,gitlab,ci,devops,convert"
  }
**/

function main(state) {
  const yaml = state.text;

  let gitlab = '';

  // Extract jobs
  const jobsMatch = yaml.match(/jobs:([\s\S]+)/);
  if (!jobsMatch) {
    state.postError("No jobs found in GitHub Actions workflow");
    return;
  }

  // Simple conversion
  gitlab += `stages:
  - build
  - test
  - deploy

`;

  // Add a sample job
  gitlab += `build-job:
  stage: build
  script:
    - echo "Building..."
    # Add your build commands here

test-job:
  stage: test
  script:
    - echo "Testing..."
    # Add your test commands here
`;

  state.text = gitlab;
  state.postInfo("Generated GitLab CI template (manual review needed)");
}

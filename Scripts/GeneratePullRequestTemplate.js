/**
  {
    "api": 1,
    "name": "Generate PR Template",
    "description": "Generate pull request template for GitHub/GitLab",
    "author": "Boop",
    "icon": "doc",
    "tags": "git,github,pr,template,pull-request"
  }
**/

function main(state) {
  const template = `## Description
<!-- Describe your changes in detail -->

## Type of Change
<!-- Mark with an 'x' -->
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update
- [ ] Refactoring
- [ ] Performance improvement

## Related Issues
<!-- Link to related issues -->
Fixes #
Closes #
Refs #

## How Has This Been Tested?
<!-- Describe the tests you ran -->
- [ ] Unit tests
- [ ] Integration tests
- [ ] Manual testing
- [ ] E2E tests

## Screenshots (if applicable)
<!-- Add screenshots here -->

## Checklist
- [ ] My code follows the project's style guidelines
- [ ] I have performed a self-review of my code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
- [ ] Any dependent changes have been merged and published

## Additional Notes
<!-- Any additional information -->`;

  state.text = template;
  state.postInfo("Generated PR template");
}

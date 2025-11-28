/**
  {
    "api": 1,
    "name": "Generate Changelog Entry",
    "description": "Format git log entry for CHANGELOG.md",
    "author": "Boop",
    "icon": "doc",
    "tags": "git,changelog,format,release"
  }
**/

function main(state) {
  const version = state.text.trim() || '1.0.0';
  const date = new Date().toISOString().split('T')[0];

  const changelog = `## [${version}] - ${date}

### Added
- New feature 1
- New feature 2

### Changed
- Updated component X
- Improved performance of Y

### Fixed
- Fixed bug in Z
- Resolved issue #123

### Deprecated
- Old API endpoint /v1/users

### Removed
- Deprecated feature X

### Security
- Updated dependency with security vulnerability

---

<!-- Previous versions below -->`;

  state.text = changelog;
  state.postInfo("Generated changelog entry");
}

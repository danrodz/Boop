/**
  {
    "api": 1,
    "name": "Validate SemVer",
    "description": "Validate semantic version number",
    "author": "Boop",
    "icon": "number",
    "tags": "semver,version,validate"
  }
**/

function main(state) {
  try {
    const version = state.text.trim();

    // SemVer format: MAJOR.MINOR.PATCH(-prerelease)(+build)
    const pattern = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;

    const match = version.match(pattern);

    if (match) {
      state.text = `✓ Valid SemVer\n\nMAJOR: ${match[1]}\nMINOR: ${match[2]}\nPATCH: ${match[3]}\nPre-release: ${match[4] || 'none'}\nBuild: ${match[5] || 'none'}`;
    } else {
      state.text = '✗ Invalid SemVer\n\nFormat: MAJOR.MINOR.PATCH\nExample: 1.2.3 or 1.0.0-alpha+001';
    }
  } catch (error) {
    state.postError("Validation failed: " + error.message);
  }
}

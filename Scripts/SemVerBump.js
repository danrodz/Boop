/**
  {
    "api": 1,
    "name": "Bump Semantic Version",
    "description": "Increment semantic version (major.minor.patch)",
    "author": "Boop",
    "icon": "tag",
    "tags": "semver,version,bump,git"
  }
**/

function main(state) {
  const input = state.text.trim().split(/\s+/);
  const version = input[0];
  const bumpType = (input[1] || 'patch').toLowerCase();

  const versionMatch = version.match(/^(\d+)\.(\d+)\.(\d+)(-(.+))?$/);
  if (!versionMatch) {
    state.postError("Invalid semantic version. Expected format: X.Y.Z or X.Y.Z-prerelease");
    return;
  }

  let [, major, minor, patch, , prerelease] = versionMatch;
  major = parseInt(major);
  minor = parseInt(minor);
  patch = parseInt(patch);

  let newVersion;
  switch (bumpType) {
    case 'major':
      newVersion = `${major + 1}.0.0`;
      break;
    case 'minor':
      newVersion = `${major}.${minor + 1}.0`;
      break;
    case 'patch':
      newVersion = `${major}.${minor}.${patch + 1}`;
      break;
    case 'premajor':
      newVersion = `${major + 1}.0.0-0`;
      break;
    case 'preminor':
      newVersion = `${major}.${minor + 1}.0-0`;
      break;
    case 'prepatch':
      newVersion = `${major}.${minor}.${patch + 1}-0`;
      break;
    default:
      state.postError(`Unknown bump type: ${bumpType}. Use: major, minor, patch, premajor, preminor, prepatch`);
      return;
  }

  state.text = `${version} → ${newVersion}

Git commands:
git tag v${newVersion}
git push origin v${newVersion}`;

  state.postInfo(`Bumped ${bumpType} version`);
}

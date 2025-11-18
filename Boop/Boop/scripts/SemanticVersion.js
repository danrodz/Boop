/**
	{
		"api":1,
		"name":"Bump Semantic Version",
		"description":"Increments semantic version numbers (major.minor.patch)",
		"author":"Boop",
		"icon":"number",
		"tags":"semver,version,bump,increment"
	}
**/

function main(state) {
	const text = state.text.trim();

	// Parse semver
	const semverPattern = /^v?(\d+)\.(\d+)\.(\d+)(-[\w.]+)?(\+[\w.]+)?$/;
	const match = text.match(semverPattern);

	if (!match) {
		state.postError("Not a valid semantic version (e.g., 1.2.3 or v1.2.3)");
		return;
	}

	const [, major, minor, patch, prerelease, build] = match;
	const hasV = text.startsWith('v');
	const prefix = hasV ? 'v' : '';
	const suffix = (prerelease || '') + (build || '');

	const versions = {
		current: `${prefix}${major}.${minor}.${patch}${suffix}`,
		major: `${prefix}${parseInt(major) + 1}.0.0`,
		minor: `${prefix}${major}.${parseInt(minor) + 1}.0`,
		patch: `${prefix}${major}.${minor}.${parseInt(patch) + 1}`
	};

	const result = `Current: ${versions.current}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Bump Major:  ${versions.major}  (breaking changes)
Bump Minor:  ${versions.minor}  (new features)
Bump Patch:  ${versions.patch}  (bug fixes)

SemVer Rules:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MAJOR: Incompatible API changes
MINOR: Backward-compatible new features
PATCH: Backward-compatible bug fixes

Paste the version you want to use.`;

	state.text = result;
}

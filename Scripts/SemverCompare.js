/**
  {
    "api": 1,
    "name": "Semver Compare",
    "description": "Compares semantic versions (separate with --- or one per line)",
    "author": "Boop",
    "icon": "number",
    "tags": "semver,version,compare,semantic,sort"
  }
**/

function main(state) {
  function parseSemver(version) {
    var match = version.trim().match(/^v?(\d+)\.(\d+)\.(\d+)(?:-([a-zA-Z0-9.-]+))?(?:\+([a-zA-Z0-9.-]+))?$/);
    if (!match) return null;
    return {
      major: parseInt(match[1]),
      minor: parseInt(match[2]),
      patch: parseInt(match[3]),
      prerelease: match[4] || null,
      build: match[5] || null,
      original: version.trim()
    };
  }
  
  function compareSemver(a, b) {
    if (a.major !== b.major) return a.major - b.major;
    if (a.minor !== b.minor) return a.minor - b.minor;
    if (a.patch !== b.patch) return a.patch - b.patch;
    
    // No prerelease > prerelease
    if (!a.prerelease && b.prerelease) return 1;
    if (a.prerelease && !b.prerelease) return -1;
    if (a.prerelease && b.prerelease) {
      return a.prerelease.localeCompare(b.prerelease);
    }
    return 0;
  }
  
  var text = state.text.trim();
  var versions;
  
  if (text.indexOf("---") > -1) {
    versions = text.split("---").map(function(v) { return v.trim(); });
  } else {
    versions = text.split("\n").map(function(v) { return v.trim(); }).filter(function(v) { return v; });
  }
  
  var parsed = versions.map(parseSemver).filter(function(v) { return v !== null; });
  
  if (parsed.length === 0) {
    state.postError("No valid semver strings found");
    return;
  }
  
  if (parsed.length === 2) {
    var cmp = compareSemver(parsed[0], parsed[1]);
    var relation;
    if (cmp < 0) relation = "<";
    else if (cmp > 0) relation = ">";
    else relation = "=";
    
    state.text = parsed[0].original + " " + relation + " " + parsed[1].original;
    state.postInfo("Comparison complete");
  } else {
    // Sort all versions
    parsed.sort(compareSemver);
    
    state.text = "Sorted versions (oldest to newest):\n\n" + 
                 parsed.map(function(v) { return v.original; }).join("\n") +
                 "\n\nLatest: " + parsed[parsed.length - 1].original;
    state.postInfo("Sorted " + parsed.length + " versions");
  }
}

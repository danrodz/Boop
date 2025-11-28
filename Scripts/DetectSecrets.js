/**
  {
    "api": 1,
    "name": "Detect Secrets",
    "description": "Scan text for potential secrets and credentials",
    "author": "Boop",
    "icon": "key",
    "tags": "security,secrets,detect,scan"
  }
**/

function main(state) {
  const text = state.text;
  const findings = [];

  const patterns = [
    { name: 'AWS Access Key', regex: /AKIA[0-9A-Z]{16}/ },
    { name: 'Generic API Key', regex: /[aA][pP][iI][_]?[kK][eE][yY].*['\"]([0-9a-zA-Z]{32,45})['\"]/},
    { name: 'Generic Secret', regex: /[sS][eE][cC][rR][eE][tT].*['\"]([0-9a-zA-Z]{32,45})['\"]/},
    { name: 'Password in Code', regex: /[pP][aA][sS][sS][wW][oO][rR][dD].*['\"]([^'\"]+)['\"]/ },
    { name: 'Private Key', regex: /-----BEGIN (RSA|DSA|EC|OPENSSH) PRIVATE KEY-----/ },
    { name: 'GitHub Token', regex: /ghp_[0-9a-zA-Z]{36}/ },
    { name: 'Slack Token', regex: /xox[baprs]-[0-9a-zA-Z-]+/ },
    { name: 'JWT Token', regex: /eyJ[A-Za-z0-9-_=]+\.eyJ[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*/ }
  ];

  patterns.forEach(pattern => {
    const matches = text.match(new RegExp(pattern.regex, 'g'));
    if (matches) {
      findings.push(`⚠️  ${pattern.name}: ${matches.length} found`);
    }
  });

  if (findings.length > 0) {
    state.text = `Security Scan Results:\n\n${findings.join('\n')}\n\n⚠️  WARNING: Potential secrets detected!\nDo not commit this code to version control.`;
    state.postError(`Found ${findings.length} potential secret(s)`);
  } else {
    state.text = "✓ No obvious secrets detected.\n\nNote: This is a basic scan. Always review code carefully.";
    state.postInfo("No secrets found");
  }
}

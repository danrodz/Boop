/**
  {
    "api": 1,
    "name": "Validate UUID",
    "description": "Validates UUID format and version",
    "author": "Boop",
    "icon": "number.circle.fill",
    "tags": "uuid,validate,check,guid"
  }
**/

function main(state) {
  const uuid = state.text.trim().toLowerCase();
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-([1-5])[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
  const match = uuid.match(uuidRegex);

  if (match) {
    const version = match[1];
    const versionNames = {
      '1': 'Time-based',
      '2': 'DCE Security',
      '3': 'MD5 hash (namespace)',
      '4': 'Random',
      '5': 'SHA-1 hash (namespace)'
    };

    state.text = `✓ Valid UUID

Version: ${version} (${versionNames[version]})
Canonical: ${uuid}
Uppercase: ${uuid.toUpperCase()}
Without dashes: ${uuid.replace(/-/g, '')}`;
  } else {
    // Check for common issues
    const noDashes = uuid.replace(/-/g, '');
    let reason = "Invalid format";

    if (noDashes.length !== 32) {
      reason = `Wrong length (${noDashes.length} chars, expected 32)`;
    } else if (!/^[0-9a-f]+$/.test(noDashes)) {
      reason = "Contains non-hexadecimal characters";
    } else if (uuid.split('-').length !== 5) {
      reason = "Incorrect dash placement (should be 8-4-4-4-12)";
    }

    state.text = `✗ Invalid UUID\n\nReason: ${reason}`;
  }
}

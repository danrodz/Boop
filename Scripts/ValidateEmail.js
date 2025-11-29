/**
  {
    "api": 1,
    "name": "Validate Email",
    "description": "Validates email address format",
    "author": "Boop",
    "icon": "envelope.fill",
    "tags": "email,validate,check"
  }
**/

function main(state) {
  const email = String(state.text || '').trim();

  if (!email) {
    state.text = "✗ Invalid email\n\nReason: Empty input";
    if (typeof state.postError === "function") {
      state.postError("Empty email input");
    }
    return;
  }

  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

  if (emailRegex.test(email)) {
    const [localPart, domain] = email.split('@');
    const domainParts = domain.split('.');
    const tld = domainParts[domainParts.length - 1];

    state.text = `✓ Valid email format

Local part: ${localPart}
Domain: ${domain}
TLD: ${tld}`;
    if (typeof state.postInfo === "function") {
      state.postInfo("Valid email format");
    }
  } else {
    let reason = "Invalid format";

    if (!email.includes('@')) {
      reason = "Missing @ symbol";
    } else if (email.startsWith('@')) {
      reason = "Missing local part (before @)";
    } else if (email.endsWith('@')) {
      reason = "Missing domain (after @)";
    } else if (!email.split('@')[1].includes('.')) {
      reason = "Domain must contain at least one dot";
    }

    state.text = `✗ Invalid email\n\nReason: ${reason}`;
    if (typeof state.postError === "function") {
      state.postError("Invalid email format: " + reason);
    }
  }
}

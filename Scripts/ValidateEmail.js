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
  const email = state.text.trim();

  // Comprehensive email regex
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

  if (emailRegex.test(email)) {
    const [localPart, domain] = email.split('@');
    state.text = `✓ Valid email format

Local part: ${localPart}
Domain: ${domain}`;
  } else {
    // Provide specific feedback
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
  }
}

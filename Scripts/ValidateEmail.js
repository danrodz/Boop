/**
  {
    "api": 1,
    "name": "Validate Email Address",
    "description": "Validate email address format",
    "author": "Boop",
    "icon": "envelope",
    "tags": "email,validate,check"
  }
**/

function main(state) {
  try {
    const email = state.text.trim();

    // RFC 5322 compliant regex (simplified)
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    const isValid = emailRegex.test(email);

    let result = isValid ? '✓ Valid email address\n\n' : '✗ Invalid email address\n\n';

    // Extract parts
    if (isValid) {
      const [local, domain] = email.split('@');
      const domainParts = domain.split('.');
      const tld = domainParts[domainParts.length - 1];

      result += `Local part: ${local}\n`;
      result += `Domain: ${domain}\n`;
      result += `TLD: ${tld}`;
    } else {
      result += 'Common issues:\n';
      result += '- Missing @ symbol\n';
      result += '- Invalid characters\n';
      result += '- Missing domain\n';
      result += '- Invalid TLD';
    }

    state.text = result;
  } catch (error) {
    state.postError("Validation failed: " + error.message);
  }
}

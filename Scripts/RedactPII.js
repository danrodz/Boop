/**
  {
    "api": 1,
    "name": "Redact PII",
    "description": "Redact personally identifiable information (emails, phones, SSN)",
    "author": "Boop",
    "icon": "eye.slash.fill",
    "tags": "redact,pii,privacy,security,sensitive"
  }
**/

function main(state) {
  try {
    let text = state.text;

    // Redact email addresses
    text = text.replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, '[EMAIL REDACTED]');

    // Redact phone numbers (various formats)
    text = text.replace(/\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g, '[PHONE REDACTED]');
    text = text.replace(/\b\(\d{3}\)\s*\d{3}[-.]?\d{4}\b/g, '[PHONE REDACTED]');

    // Redact SSN
    text = text.replace(/\b\d{3}-\d{2}-\d{4}\b/g, '[SSN REDACTED]');

    // Redact credit card numbers
    text = text.replace(/\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/g, '[CARD REDACTED]');

    // Redact IP addresses
    text = text.replace(/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/g, '[IP REDACTED]');

    state.text = text;
  } catch (error) {
    state.postError("Failed to redact PII: " + error.message);
  }
}

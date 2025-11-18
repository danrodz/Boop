/**
  {
    "api": 1,
    "name": "Secret Masker",
    "description": "Mask secrets in logs/output (API keys, tokens, passwords)",
    "author": "Boop",
    "icon": "eye.slash",
    "tags": "secret,mask,redact,security,hide"
  }
**/

function main(state) {
  try {
    let text = state.text;

    // Mask common patterns
    text = text.replace(/([Aa]pi[_-]?[Kk]ey[:\s=]+)([A-Za-z0-9_-]{20,})/g, '$1***REDACTED***');
    text = text.replace(/([Tt]oken[:\s=]+)([A-Za-z0-9_-]{20,})/g, '$1***REDACTED***');
    text = text.replace(/([Pp]assword[:\s=]+)([^\s]+)/gi, '$1***REDACTED***');
    text = text.replace(/([Ss]ecret[:\s=]+)([^\s]+)/gi, '$1***REDACTED***');
    text = text.replace(/([Aa]ccess[_-]?[Kk]ey[:\s=]+)([A-Za-z0-9_-]{16,})/g, '$1***REDACTED***');

    // Mask AWS keys
    text = text.replace(/AKIA[0-9A-Z]{16}/g, 'AKIA***REDACTED***');

    // Mask JWT tokens
    text = text.replace(/eyJ[A-Za-z0-9_-]+\.eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/g, 'eyJ***REDACTED***');

    state.text = text;
    state.postInfo("Masked common secret patterns");
  } catch (error) {
    state.postError("Failed to mask: " + error.message);
  }
}

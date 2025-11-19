/**
  {
    "api": 1,
    "name": "SSH Key Fingerprint",
    "description": "Display information about SSH public key format",
    "author": "Boop",
    "icon": "key.fill",
    "tags": "ssh,key,fingerprint,security,public"
  }
**/

function main(state) {
  try {
    const key = state.text.trim();

    // Parse SSH public key
    const parts = key.split(/\s+/);

    if (parts.length < 2) {
      state.postError("Invalid SSH key format");
      return;
    }

    const keyType = parts[0];
    const keyData = parts[1];
    const comment = parts[2] || 'no comment';

    // Determine key algorithm
    const algorithms = {
      'ssh-rsa': 'RSA',
      'ssh-dss': 'DSA',
      'ecdsa-sha2-nistp256': 'ECDSA 256-bit',
      'ecdsa-sha2-nistp384': 'ECDSA 384-bit',
      'ecdsa-sha2-nistp521': 'ECDSA 521-bit',
      'ssh-ed25519': 'Ed25519'
    };

    const algorithm = algorithms[keyType] || keyType;

    // Estimate key strength
    let strength = 'Unknown';
    if (keyType === 'ssh-rsa') {
      const keyLength = Math.floor(keyData.length * 3 / 4) * 8;
      if (keyLength >= 4096) strength = 'Very Strong';
      else if (keyLength >= 2048) strength = 'Strong';
      else strength = 'Weak (upgrade recommended)';
    } else if (keyType === 'ssh-ed25519') {
      strength = 'Very Strong';
    }

    const result = [
      `SSH Public Key Information:`,
      ``,
      `Algorithm: ${algorithm}`,
      `Type: ${keyType}`,
      `Strength: ${strength}`,
      ``,
      `Key Data Length: ${keyData.length} characters`,
      `Comment: ${comment}`,
      ``,
      `Note: This is basic key info.`,
      `Use ssh-keygen -lf <file> for full fingerprint.`
    ].join('\n');

    state.text = result;
  } catch (error) {
    state.postError("Error parsing SSH key: " + error.message);
  }
}

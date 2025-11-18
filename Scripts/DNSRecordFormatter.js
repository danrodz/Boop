/**
  {
    "api": 1,
    "name": "DNS Record Formatter",
    "description": "Format and validate DNS records",
    "author": "Boop",
    "icon": "network",
    "tags": "dns,record,format,validate"
  }
**/

function main(state) {
  try {
    const lines = state.text.trim().split('\n');
    let result = '';

    for (let line of lines) {
      line = line.trim();
      if (!line) continue;

      const parts = line.split(/\s+/);

      // Common DNS record types
      if (parts.length >= 4) {
        const [name, ttl, recordClass, type, ...value] = parts;

        result += `Name: ${name}\n`;
        result += `TTL: ${ttl}\n`;
        result += `Class: ${recordClass}\n`;
        result += `Type: ${type}\n`;
        result += `Value: ${value.join(' ')}\n`;
        result += '─'.repeat(40) + '\n';
      }
    }

    if (!result) {
      result = 'No valid DNS records found\n\n';
      result += 'Format: name ttl class type value\n';
      result += 'Example: example.com. 300 IN A 192.0.2.1';
    }

    state.text = result.trim();
  } catch (error) {
    state.postError("Failed to format DNS records: " + error.message);
  }
}

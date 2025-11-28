/**
  {
    "api": 1,
    "name": "DNS Record Formatter",
    "description": "Format DNS records for zone files",
    "author": "Boop",
    "icon": "server.rack",
    "tags": "dns,record,zone,bind,format"
  }
**/

function main(state) {
  try {
    const input = state.text.trim();

    // Example input formats:
    // example.com A 192.168.1.1
    // www CNAME example.com
    // @ MX 10 mail.example.com

    const lines = input.split('\n');
    const formatted = [];

    for (const line of lines) {
      if (!line.trim()) continue;

      const parts = line.trim().split(/\s+/);

      if (parts.length < 3) continue;

      const name = parts[0].padEnd(20);
      const type = parts[1].padEnd(8);
      const value = parts.slice(2).join(' ');

      formatted.push(`${name} IN ${type} ${value}`);
    }

    if (formatted.length === 0) {
      state.text = 'Format: name type value\n\nExamples:\nexample.com A 192.168.1.1\nwww CNAME example.com\n@ MX 10 mail.example.com';
      return;
    }

    state.text = formatted.join('\n');
  } catch (error) {
    state.postError("Error formatting DNS records: " + error.message);
  }
}

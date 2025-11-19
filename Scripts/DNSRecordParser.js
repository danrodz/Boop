/**
  {
    "api": 1,
    "name": "DNS Record Parser",
    "description": "Parse and explain DNS record types",
    "author": "Boop",
    "icon": "globe",
    "tags": "dns,record,parse,domain"
  }
**/

function main(state) {
  try {
    const records = state.text.split('\n').filter(l => l.trim());
    const parsed = [];

    const recordTypes = {
      'A': 'IPv4 Address',
      'AAAA': 'IPv6 Address',
      'CNAME': 'Canonical Name (Alias)',
      'MX': 'Mail Exchange',
      'NS': 'Name Server',
      'TXT': 'Text Record',
      'SOA': 'Start of Authority',
      'SRV': 'Service Record',
      'PTR': 'Pointer Record',
      'CAA': 'Certification Authority Authorization',
      'DKIM': 'DomainKeys Identified Mail',
      'SPF': 'Sender Policy Framework',
      'DMARC': 'Domain-based Message Authentication'
    };

    for (let record of records) {
      // Try to parse common DNS record formats
      const parts = record.split(/\s+/);

      if (parts.length >= 3) {
        const name = parts[0];
        const type = parts.find(p => recordTypes[p.toUpperCase()]);
        const value = parts.slice(parts.indexOf(type) + 1).join(' ');

        if (type) {
          parsed.push({
            name: name,
            type: type.toUpperCase(),
            value: value || parts[parts.length - 1]
          });
        }
      }
    }

    let result = `=== DNS RECORD ANALYSIS ===\n\n`;

    if (parsed.length === 0) {
      result += `=== RECORD TYPE REFERENCE ===\n\n`;

      for (let type in recordTypes) {
        result += `${type.padEnd(8)} - ${recordTypes[type]}\n`;

        if (type === 'A') {
          result += `           Maps domain to IPv4 address\n`;
          result += `           Example: example.com A 192.0.2.1\n\n`;
        } else if (type === 'AAAA') {
          result += `           Maps domain to IPv6 address\n`;
          result += `           Example: example.com AAAA 2001:db8::1\n\n`;
        } else if (type === 'CNAME') {
          result += `           Creates alias to another domain\n`;
          result += `           Example: www CNAME example.com\n\n`;
        } else if (type === 'MX') {
          result += `           Specifies mail server (with priority)\n`;
          result += `           Example: example.com MX 10 mail.example.com\n\n`;
        } else if (type === 'TXT') {
          result += `           Arbitrary text, often used for verification\n`;
          result += `           Example: example.com TXT "v=spf1 mx -all"\n\n`;
        } else {
          result += '\n';
        }
      }
    } else {
      result += `Found ${parsed.length} DNS record(s):\n\n`;

      parsed.forEach((rec, i) => {
        result += `[${i + 1}] ${rec.type} Record\n`;
        result += `    Name: ${rec.name}\n`;
        result += `    Type: ${rec.type} (${recordTypes[rec.type]})\n`;
        result += `    Value: ${rec.value}\n\n`;
      });
    }

    state.text = result;
  } catch (error) {
    state.postError("DNS parsing failed: " + error.message);
  }
}

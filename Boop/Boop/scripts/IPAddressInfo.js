/**
  {
    "api": 1,
    "name": "IP Address Info",
    "description": "Get information about IP address (IPv4/IPv6)",
    "author": "Boop",
    "icon": "network",
    "tags": "ip,address,network,ipv4,ipv6"
  }
**/

function main(state) {
  try {
    const ip = state.text.trim();

    // Check if IPv4
    const ipv4Pattern = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
    const ipv4Match = ip.match(ipv4Pattern);

    if (ipv4Match) {
      const octets = ipv4Match.slice(1).map(Number);

      if (octets.some(o => o > 255)) {
        state.postError("Invalid IPv4 address (octets must be 0-255)");
        return;
      }

      // Determine class and type
      let ipClass = '';
      let type = 'Public';

      if (octets[0] < 128) ipClass = 'A';
      else if (octets[0] < 192) ipClass = 'B';
      else if (octets[0] < 224) ipClass = 'C';
      else if (octets[0] < 240) ipClass = 'D (Multicast)';
      else ipClass = 'E (Reserved)';

      // Check if private
      if ((octets[0] === 10) ||
          (octets[0] === 172 && octets[1] >= 16 && octets[1] <= 31) ||
          (octets[0] === 192 && octets[1] === 168)) {
        type = 'Private';
      } else if (octets[0] === 127) {
        type = 'Loopback';
      } else if (octets[0] === 169 && octets[1] === 254) {
        type = 'Link-Local';
      }

      // Convert to binary
      const binary = octets.map(o => o.toString(2).padStart(8, '0')).join('.');

      // Convert to hex
      const hex = octets.map(o => o.toString(16).padStart(2, '0')).join('.');

      // Convert to decimal
      const decimal = octets.reduce((sum, o, i) => sum + o * Math.pow(256, 3 - i), 0);

      const result = [
        `IPv4 Address: ${ip}`,
        `Type: ${type}`,
        `Class: ${ipClass}`,
        ``,
        `Binary: ${binary}`,
        `Hexadecimal: ${hex}`,
        `Decimal: ${decimal}`,
        ``,
        `Octets: ${octets.join(', ')}`
      ].join('\n');

      state.text = result;
    }
    // Check if IPv6
    else if (ip.includes(':')) {
      const result = [
        `IPv6 Address: ${ip}`,
        `Type: ${ip.startsWith('fe80') ? 'Link-Local' : ip.startsWith('fc') || ip.startsWith('fd') ? 'Unique Local' : ip === '::1' ? 'Loopback' : 'Global'}`,
        ``,
        `Compressed: ${ip}`,
        `Note: Full IPv6 analysis requires more complex parsing`
      ].join('\n');

      state.text = result;
    } else {
      state.postError("Invalid IP address format");
    }
  } catch (error) {
    state.postError("Error analyzing IP address: " + error.message);
  }
}

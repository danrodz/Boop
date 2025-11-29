/**
  {
    "api": 1,
    "name": "IP Address Info",
    "description": "Shows IP address details and validates format",
    "author": "Boop",
    "icon": "network",
    "tags": "ip,address,network,info,validate"
  }
**/

function main(state) {
  try {
    const ip = state.text.trim();

    // Check if IPv4
    const ipv4Regex = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
    const ipv4Match = ip.match(ipv4Regex);

    if (ipv4Match) {
      const octets = ipv4Match.slice(1, 5).map(Number);

      // Validate octets
      if (octets.some(o => o > 255)) {
        state.postError("Invalid IPv4: octets must be 0-255");
        return;
      }

      // Convert to integer
      const int = octets.reduce((acc, octet) => (acc << 8) + octet, 0) >>> 0;
      const hex = '0x' + int.toString(16).toUpperCase().padStart(8, '0');
      const binary = octets.map(o => o.toString(2).padStart(8, '0')).join('.');

      // Determine class and type
      let ipClass, type;

      if (octets[0] === 127) {
        ipClass = 'Loopback';
        type = 'Loopback (localhost)';
      } else if (octets[0] === 10) {
        ipClass = 'A';
        type = 'Private (RFC 1918)';
      } else if (octets[0] === 172 && octets[1] >= 16 && octets[1] <= 31) {
        ipClass = 'B';
        type = 'Private (RFC 1918)';
      } else if (octets[0] === 192 && octets[1] === 168) {
        ipClass = 'C';
        type = 'Private (RFC 1918)';
      } else if (octets[0] === 169 && octets[1] === 254) {
        type = 'Link-Local (APIPA)';
      } else if (octets[0] >= 224 && octets[0] <= 239) {
        ipClass = 'D';
        type = 'Multicast';
      } else if (octets[0] >= 240) {
        ipClass = 'E';
        type = 'Reserved';
      } else if (octets[0] < 128) {
        ipClass = 'A';
        type = 'Public';
      } else if (octets[0] < 192) {
        ipClass = 'B';
        type = 'Public';
      } else if (octets[0] < 224) {
        ipClass = 'C';
        type = 'Public';
      }

      let result = `IPv4 ADDRESS INFO

IP: ${ip}
Type: ${type}`;

      if (ipClass) {
        result += `\nClass: ${ipClass}`;
      }

      result += `

Integer: ${int.toLocaleString()}
Hexadecimal: ${hex}
Binary: ${binary}`;

      state.text = result;
      return;
    }

    // Check if IPv6
    const ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4})$/;

    if (ipv6Regex.test(ip)) {
      state.text = `IPv6 ADDRESS INFO

IP: ${ip}
Type: IPv6
Format: Valid`;
      return;
    }

    state.postError("Invalid IP address format");

  } catch (error) {
    state.postError("Failed to parse IP: " + error.message);
  }
}

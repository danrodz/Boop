/**
  {
    "api": 1,
    "name": "Validate IPv4/IPv6",
    "description": "Validate IP address (v4 or v6)",
    "author": "Boop",
    "icon": "network",
    "tags": "ip,ipv4,ipv6,validate,check"
  }
**/

function main(state) {
  try {
    const ip = state.text.trim();

    // IPv4 validation
    const ipv4Regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

    // IPv6 validation (simplified)
    const ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/;

    if (ipv4Regex.test(ip)) {
      const octets = ip.split('.');
      let result = '✓ Valid IPv4 address\n\n';
      result += `Octets: ${octets.join(' . ')}\n`;
      result += `Class: `;

      const first = parseInt(octets[0]);
      if (first < 128) result += 'A (1-126)';
      else if (first < 192) result += 'B (128-191)';
      else if (first < 224) result += 'C (192-223)';
      else if (first < 240) result += 'D (224-239, Multicast)';
      else result += 'E (240-255, Reserved)';

      state.text = result;
    } else if (ipv6Regex.test(ip)) {
      state.text = '✓ Valid IPv6 address\n\nFormat: 128-bit hexadecimal';
    } else {
      state.text = '✗ Invalid IP address\n\nMust be valid IPv4 or IPv6';
    }
  } catch (error) {
    state.postError("Validation failed: " + error.message);
  }
}

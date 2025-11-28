/**
  {
    "api": 1,
    "name": "Extract IP Addresses",
    "description": "Extract all IPv4 and IPv6 addresses from text",
    "author": "Boop",
    "icon": "network",
    "tags": "ip,extract,network,ipv4,ipv6"
  }
**/

function main(state) {
  try {
    const text = state.text;
    const ips = [];

    // IPv4
    const ipv4Regex = /\b(?:\d{1,3}\.){3}\d{1,3}\b/g;
    const ipv4Matches = text.match(ipv4Regex);
    if (ipv4Matches) {
      ips.push(...ipv4Matches);
    }

    // IPv6 (simplified)
    const ipv6Regex = /\b(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}\b/g;
    const ipv6Matches = text.match(ipv6Regex);
    if (ipv6Matches) {
      ips.push(...ipv6Matches);
    }

    state.text = ips.length > 0 ? ips.join('\n') : 'No IP addresses found';
  } catch (error) {
    state.postError("Failed to extract IP addresses: " + error.message);
  }
}

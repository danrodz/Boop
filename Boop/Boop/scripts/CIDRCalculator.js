/**
  {
    "api": 1,
    "name": "CIDR Calculator",
    "description": "Calculate CIDR network information (format: 192.168.1.0/24)",
    "author": "Boop",
    "icon": "network",
    "tags": "cidr,network,subnet,ip,mask"
  }
**/

function main(state) {
  try {
    const input = state.text.trim();
    const parts = input.split('/');

    if (parts.length !== 2) {
      state.postError("Format: IP/prefix (e.g., 192.168.1.0/24)");
      return;
    }

    const ip = parts[0];
    const prefix = parseInt(parts[1]);

    if (prefix < 0 || prefix > 32) {
      state.postError("Prefix must be 0-32");
      return;
    }

    // Parse IP
    const octets = ip.split('.').map(Number);

    if (octets.length !== 4 || octets.some(o => o > 255 || o < 0)) {
      state.postError("Invalid IP address");
      return;
    }

    // Calculate subnet mask
    const maskBits = '1'.repeat(prefix) + '0'.repeat(32 - prefix);
    const maskOctets = [];

    for (let i = 0; i < 4; i++) {
      maskOctets.push(parseInt(maskBits.substr(i * 8, 8), 2));
    }

    const subnetMask = maskOctets.join('.');

    // Calculate network address
    const networkOctets = octets.map((o, i) => o & maskOctets[i]);
    const networkAddress = networkOctets.join('.');

    // Calculate broadcast address
    const broadcastOctets = networkOctets.map((o, i) => o | (~maskOctets[i] & 255));
    const broadcastAddress = broadcastOctets.join('.');

    // Calculate first and last usable
    const firstUsable = [...networkOctets];
    firstUsable[3] += 1;
    const lastUsable = [...broadcastOctets];
    lastUsable[3] -= 1;

    // Calculate total hosts
    const totalHosts = Math.pow(2, 32 - prefix);
    const usableHosts = totalHosts - 2;

    const result = [
      `CIDR: ${input}`,
      ``,
      `Network Address: ${networkAddress}`,
      `Broadcast Address: ${broadcastAddress}`,
      `Subnet Mask: ${subnetMask}`,
      ``,
      `First Usable: ${firstUsable.join('.')}`,
      `Last Usable: ${lastUsable.join('.')}`,
      ``,
      `Total Hosts: ${totalHosts}`,
      `Usable Hosts: ${usableHosts}`,
      ``,
      `Wildcard Mask: ${maskOctets.map(o => 255 - o).join('.')}`
    ].join('\n');

    state.text = result;
  } catch (error) {
    state.postError("Error calculating CIDR: " + error.message);
  }
}

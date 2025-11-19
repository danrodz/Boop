/**
  {
    "api": 1,
    "name": "CIDR Calculator",
    "description": "Calculate CIDR notation and IP ranges",
    "author": "Boop",
    "icon": "number.square",
    "tags": "cidr,ip,network,subnet,range"
  }
**/

function main(state) {
  try {
    const input = state.text.trim();

    // Parse CIDR notation
    const match = input.match(/^(\d+\.\d+\.\d+\.\d+)\/(\d+)$/);

    if (!match) {
      state.postError("Use CIDR format: 192.168.1.0/24");
      return;
    }

    const ip = match[1];
    const prefix = parseInt(match[2]);

    if (prefix < 0 || prefix > 32) {
      state.postError("Prefix must be 0-32");
      return;
    }

    const octets = ip.split('.').map(Number);

    if (octets.some(o => o < 0 || o > 255)) {
      state.postError("Invalid IP address");
      return;
    }

    // Calculate addresses
    const totalAddresses = Math.pow(2, 32 - prefix);
    const usableAddresses = prefix === 31 ? 2 : (prefix === 32 ? 1 : totalAddresses - 2);

    // Subnet mask
    const maskBits = '1'.repeat(prefix) + '0'.repeat(32 - prefix);
    const maskOctets = [];

    for (let i = 0; i < 4; i++) {
      maskOctets.push(parseInt(maskBits.substr(i * 8, 8), 2));
    }

    // Wildcard mask
    const wildcardOctets = maskOctets.map(o => 255 - o);

    // Network address
    const ipInt = (octets[0] << 24) + (octets[1] << 16) + (octets[2] << 8) + octets[3];
    const maskInt = (maskOctets[0] << 24) + (maskOctets[1] << 16) + (maskOctets[2] << 8) + maskOctets[3];
    const networkInt = ipInt & maskInt;

    const networkOctets = [
      (networkInt >>> 24) & 255,
      (networkInt >>> 16) & 255,
      (networkInt >>> 8) & 255,
      networkInt & 255
    ];

    // Broadcast address
    const broadcastInt = networkInt + totalAddresses - 1;
    const broadcastOctets = [
      (broadcastInt >>> 24) & 255,
      (broadcastInt >>> 16) & 255,
      (broadcastInt >>> 8) & 255,
      broadcastInt & 255
    ];

    // First and last usable
    const firstUsableOctets = [...networkOctets];
    firstUsableOctets[3] += 1;

    const lastUsableOctets = [...broadcastOctets];
    lastUsableOctets[3] -= 1;

    let result = `=== CIDR CALCULATOR ===\n\n`;
    result += `CIDR Notation: ${ip}/${prefix}\n\n`;

    result += `=== ADDRESSES ===\n`;
    result += `Network: ${networkOctets.join('.')}\n`;
    result += `Broadcast: ${broadcastOctets.join('.')}\n`;

    if (prefix < 31) {
      result += `First Usable: ${firstUsableOctets.join('.')}\n`;
      result += `Last Usable: ${lastUsableOctets.join('.')}\n`;
    }

    result += `\n=== MASKS ===\n`;
    result += `Subnet Mask: ${maskOctets.join('.')}\n`;
    result += `Wildcard Mask: ${wildcardOctets.join('.')}\n`;

    result += `\n=== CAPACITY ===\n`;
    result += `Total Addresses: ${totalAddresses.toLocaleString()}\n`;
    result += `Usable Addresses: ${usableAddresses.toLocaleString()}\n`;

    result += `\n=== IP RANGE ===\n`;
    result += `${networkOctets.join('.')} - ${broadcastOctets.join('.')}\n`;

    // Common CIDR blocks reference
    result += `\n=== COMMON CIDR BLOCKS ===\n`;
    result += `/8  - 16,777,216 addresses (Class A)\n`;
    result += `/16 - 65,536 addresses (Class B)\n`;
    result += `/24 - 256 addresses (Class C)\n`;
    result += `/32 - 1 address (Single host)\n`;

    state.text = result;
  } catch (error) {
    state.postError("CIDR calculation failed: " + error.message);
  }
}

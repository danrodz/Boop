/**
  {
    "api": 1,
    "name": "IP Subnet Calculator",
    "description": "Calculate IP subnet information",
    "author": "Boop",
    "icon": "number",
    "tags": "ip,subnet,cidr,network,mask"
  }
**/

function main(state) {
  try {
    const input = state.text.trim();
    let ip, mask;

    // Parse CIDR notation (192.168.1.0/24) or IP + mask
    if (input.includes('/')) {
      [ip, mask] = input.split('/');
      mask = parseInt(mask);
    } else if (input.includes(' ')) {
      [ip, mask] = input.split(/\s+/);
      // Convert dotted decimal mask to CIDR
      if (mask.includes('.')) {
        const octets = mask.split('.').map(Number);
        const binary = octets.map(o => o.toString(2).padStart(8, '0')).join('');
        mask = binary.split('1').length - 1;
      }
    } else {
      state.postError("Use format: 192.168.1.0/24 or 192.168.1.0 255.255.255.0");
      return;
    }

    // Parse IP address
    const octets = ip.split('.').map(Number);

    if (octets.length !== 4 || octets.some(o => o < 0 || o > 255)) {
      state.postError("Invalid IP address");
      return;
    }

    if (mask < 0 || mask > 32) {
      state.postError("Invalid subnet mask (must be 0-32)");
      return;
    }

    // Calculate network information
    const ipBinary = octets.map(o => o.toString(2).padStart(8, '0')).join('');
    const maskBinary = '1'.repeat(mask) + '0'.repeat(32 - mask);

    // Network address
    let networkBinary = '';
    for (let i = 0; i < 32; i++) {
      networkBinary += (ipBinary[i] === '1' && maskBinary[i] === '1') ? '1' : '0';
    }

    const networkOctets = [];
    for (let i = 0; i < 4; i++) {
      networkOctets.push(parseInt(networkBinary.substr(i * 8, 8), 2));
    }

    // Broadcast address
    let broadcastBinary = '';
    for (let i = 0; i < 32; i++) {
      broadcastBinary += (maskBinary[i] === '1') ? networkBinary[i] : '1';
    }

    const broadcastOctets = [];
    for (let i = 0; i < 4; i++) {
      broadcastOctets.push(parseInt(broadcastBinary.substr(i * 8, 8), 2));
    }

    // First and last host
    const firstHost = [...networkOctets];
    firstHost[3] += 1;

    const lastHost = [...broadcastOctets];
    lastHost[3] -= 1;

    // Subnet mask in dotted decimal
    const subnetMaskOctets = [];
    for (let i = 0; i < 4; i++) {
      subnetMaskOctets.push(parseInt(maskBinary.substr(i * 8, 8), 2));
    }

    const totalHosts = Math.pow(2, 32 - mask);
    const usableHosts = totalHosts - 2;

    // Class detection
    const firstOctet = octets[0];
    let ipClass = '';
    if (firstOctet < 128) ipClass = 'A';
    else if (firstOctet < 192) ipClass = 'B';
    else if (firstOctet < 224) ipClass = 'C';
    else if (firstOctet < 240) ipClass = 'D (Multicast)';
    else ipClass = 'E (Reserved)';

    let result = `=== IP SUBNET CALCULATOR ===\n\n`;
    result += `IP Address: ${octets.join('.')}\n`;
    result += `Subnet Mask: ${subnetMaskOctets.join('.')} (/${mask})\n`;
    result += `Class: ${ipClass}\n\n`;

    result += `=== NETWORK INFO ===\n`;
    result += `Network Address: ${networkOctets.join('.')}\n`;
    result += `Broadcast Address: ${broadcastOctets.join('.')}\n`;
    result += `First Host: ${firstHost.join('.')}\n`;
    result += `Last Host: ${lastHost.join('.')}\n\n`;

    result += `=== HOST INFO ===\n`;
    result += `Total Addresses: ${totalHosts}\n`;
    result += `Usable Hosts: ${usableHosts}\n\n`;

    result += `=== BINARY ===\n`;
    result += `IP Binary: ${ipBinary}\n`;
    result += `Mask Binary: ${maskBinary}\n`;
    result += `Network Binary: ${networkBinary}\n`;

    state.text = result;
  } catch (error) {
    state.postError("Subnet calculation failed: " + error.message);
  }
}

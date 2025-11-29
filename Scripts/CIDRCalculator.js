/**
  {
    "api": 1,
    "name": "CIDR Calculator",
    "description": "Calculates IP range and info from CIDR notation",
    "author": "Boop",
    "icon": "network",
    "tags": "cidr,ip,network,subnet,calculator"
  }
**/

function main(state) {
  try {
    const input = state.text.trim();
    const match = input.match(/^(\d+)\.(\d+)\.(\d+)\.(\d+)\/(\d+)$/);

    if (!match) {
      state.postError("Invalid CIDR format. Use: xxx.xxx.xxx.xxx/yy");
      return;
    }

    const [, o1, o2, o3, o4, prefixStr] = match;
    const octets = [o1, o2, o3, o4].map(Number);
    const prefix = parseInt(prefixStr);

    if (octets.some(o => o > 255) || prefix < 0 || prefix > 32) {
      state.postError("Invalid IP or prefix");
      return;
    }

    // Calculate network address
    const ipInt = octets.reduce((acc, octet) => (acc << 8) + octet, 0) >>> 0;
    const mask = (0xFFFFFFFF << (32 - prefix)) >>> 0;
    const networkInt = (ipInt & mask) >>> 0;
    const broadcastInt = (networkInt | ~mask) >>> 0;

    function intToIP(num) {
      return [
        (num >>> 24) & 0xFF,
        (num >>> 16) & 0xFF,
        (num >>> 8) & 0xFF,
        num & 0xFF
      ].join('.');
    }

    const networkAddr = intToIP(networkInt);
    const broadcastAddr = intToIP(broadcastInt);
    const subnetMask = intToIP(mask);
    const firstHost = intToIP(networkInt + 1);
    const lastHost = intToIP(broadcastInt - 1);

    const totalHosts = Math.pow(2, 32 - prefix);
    const usableHosts = Math.max(0, totalHosts - 2);

    // Determine class
    const firstOctet = octets[0];
    let ipClass;
    if (firstOctet < 128) ipClass = 'A';
    else if (firstOctet < 192) ipClass = 'B';
    else if (firstOctet < 224) ipClass = 'C';
    else if (firstOctet < 240) ipClass = 'D (Multicast)';
    else ipClass = 'E (Reserved)';

    const result = `CIDR CALCULATOR

Input: ${input}
Class: ${ipClass}

Network Address: ${networkAddr}
Broadcast Address: ${broadcastAddr}
Subnet Mask: ${subnetMask}

First Host: ${firstHost}
Last Host: ${lastHost}

Total Hosts: ${totalHosts.toLocaleString()}
Usable Hosts: ${usableHosts.toLocaleString()}

Binary Subnet Mask:
${mask.toString(2).padStart(32, '0').match(/.{8}/g).join('.')}`;

    state.text = result;

  } catch (error) {
    state.postError("Failed to calculate: " + error.message);
  }
}

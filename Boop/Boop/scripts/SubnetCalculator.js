/**
  {
    "api": 1,
    "name": "Subnet Calculator",
    "description": "Calculate subnet from IP and mask (format: IP mask)",
    "author": "Boop",
    "icon": "network",
    "tags": "subnet,network,ip,mask,calculator"
  }
**/

function main(state) {
  try {
    const parts = state.text.trim().split(/\s+/);

    if (parts.length < 2) {
      state.postError("Format: IP mask (e.g., 192.168.1.5 255.255.255.0)");
      return;
    }

    const ip = parts[0].split('.').map(Number);
    const mask = parts[1].split('.').map(Number);

    if (ip.length !== 4 || mask.length !== 4) {
      state.postError("Invalid IP or mask");
      return;
    }

    // Calculate network
    const network = ip.map((o, i) => o & mask[i]);

    // Calculate broadcast
    const broadcast = network.map((o, i) => o | (~mask[i] & 255));

    // Calculate CIDR prefix
    const maskBinary = mask.map(o => o.toString(2).padStart(8, '0')).join('');
    const prefix = maskBinary.split('1').length - 1;

    const result = [
      `IP Address: ${ip.join('.')}`,
      `Subnet Mask: ${mask.join('.')}`,
      `CIDR: /${prefix}`,
      ``,
      `Network: ${network.join('.')}`,
      `Broadcast: ${broadcast.join('.')}`,
      ``,
      `First Host: ${network[0]}.${network[1]}.${network[2]}.${network[3] + 1}`,
      `Last Host: ${broadcast[0]}.${broadcast[1]}.${broadcast[2]}.${broadcast[3] - 1}`,
      ``,
      `Total Hosts: ${Math.pow(2, 32 - prefix)}`,
      `Usable Hosts: ${Math.pow(2, 32 - prefix) - 2}`
    ].join('\n');

    state.text = result;
  } catch (error) {
    state.postError("Error calculating subnet: " + error.message);
  }
}

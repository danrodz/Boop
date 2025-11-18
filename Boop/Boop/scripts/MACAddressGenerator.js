/**
  {
    "api": 1,
    "name": "MAC Address Generator",
    "description": "Generate random MAC addresses",
    "author": "Boop",
    "icon": "wifi",
    "tags": "mac,address,network,random,generate"
  }
**/

function main(state) {
  try {
    const count = parseInt(state.text.trim()) || 1;

    if (count < 1 || count > 100) {
      state.postError("Count must be between 1 and 100");
      return;
    }

    const macs = [];

    for (let i = 0; i < count; i++) {
      const octets = [];

      // First octet: set locally administered bit, clear multicast bit
      const first = (Math.floor(Math.random() * 128) * 2) | 0x02;
      octets.push(first.toString(16).padStart(2, '0'));

      // Rest of the octets
      for (let j = 0; j < 5; j++) {
        const octet = Math.floor(Math.random() * 256);
        octets.push(octet.toString(16).padStart(2, '0'));
      }

      const mac = octets.join(':').toUpperCase();
      macs.push(mac);
    }

    state.text = macs.join('\n');
    state.postInfo(`Generated ${count} MAC address(es)`);
  } catch (error) {
    state.postError("Error generating MAC addresses: " + error.message);
  }
}

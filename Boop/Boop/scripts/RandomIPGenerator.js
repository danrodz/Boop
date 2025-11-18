/**
  {
    "api": 1,
    "name": "Random IP Generator",
    "description": "Generate random IP addresses (IPv4)",
    "author": "Boop",
    "icon": "network",
    "tags": "random,ip,ipv4,generate,mock"
  }
**/

function main(state) {
  try {
    const count = parseInt(state.text.trim()) || 10;

    if (count < 1 || count > 100) {
      state.postError("Count must be between 1 and 100");
      return;
    }

    const ips = [];

    for (let i = 0; i < count; i++) {
      // Generate random public IP (avoiding private ranges)
      let ip;
      do {
        const octets = [
          Math.floor(Math.random() * 256),
          Math.floor(Math.random() * 256),
          Math.floor(Math.random() * 256),
          Math.floor(Math.random() * 256)
        ];

        // Avoid private ranges
        const isPrivate = (
          octets[0] === 10 ||
          (octets[0] === 172 && octets[1] >= 16 && octets[1] <= 31) ||
          (octets[0] === 192 && octets[1] === 168) ||
          octets[0] === 127 ||
          octets[0] === 0 ||
          octets[0] >= 224
        );

        if (!isPrivate) {
          ip = octets.join('.');
          break;
        }
      } while (true);

      ips.push(ip);
    }

    state.text = ips.join('\n');
    state.postInfo(`Generated ${count} random IP(s)`);
  } catch (error) {
    state.postError("Error generating IPs: " + error.message);
  }
}

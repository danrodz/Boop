/**
  {
    "api": 1,
    "name": "Port Service Lookup",
    "description": "Lookup common port numbers and services",
    "author": "Boop",
    "icon": "circle.grid.cross",
    "tags": "port,service,network,tcp,udp"
  }
**/

function main(state) {
  try {
    const input = state.text.trim();
    const portNumber = parseInt(input);

    const commonPorts = {
      20: { name: 'FTP Data', protocol: 'TCP', description: 'File Transfer Protocol (Data)' },
      21: { name: 'FTP Control', protocol: 'TCP', description: 'File Transfer Protocol (Control)' },
      22: { name: 'SSH', protocol: 'TCP', description: 'Secure Shell' },
      23: { name: 'Telnet', protocol: 'TCP', description: 'Telnet Protocol' },
      25: { name: 'SMTP', protocol: 'TCP', description: 'Simple Mail Transfer Protocol' },
      53: { name: 'DNS', protocol: 'TCP/UDP', description: 'Domain Name System' },
      80: { name: 'HTTP', protocol: 'TCP', description: 'Hypertext Transfer Protocol' },
      110: { name: 'POP3', protocol: 'TCP', description: 'Post Office Protocol v3' },
      143: { name: 'IMAP', protocol: 'TCP', description: 'Internet Message Access Protocol' },
      443: { name: 'HTTPS', protocol: 'TCP', description: 'HTTP Secure (SSL/TLS)' },
      465: { name: 'SMTPS', protocol: 'TCP', description: 'SMTP Secure' },
      587: { name: 'SMTP Submission', protocol: 'TCP', description: 'Email Message Submission' },
      993: { name: 'IMAPS', protocol: 'TCP', description: 'IMAP Secure' },
      995: { name: 'POP3S', protocol: 'TCP', description: 'POP3 Secure' },
      1433: { name: 'MS SQL Server', protocol: 'TCP', description: 'Microsoft SQL Server' },
      1521: { name: 'Oracle DB', protocol: 'TCP', description: 'Oracle Database' },
      3306: { name: 'MySQL', protocol: 'TCP', description: 'MySQL Database' },
      3389: { name: 'RDP', protocol: 'TCP', description: 'Remote Desktop Protocol' },
      5432: { name: 'PostgreSQL', protocol: 'TCP', description: 'PostgreSQL Database' },
      5900: { name: 'VNC', protocol: 'TCP', description: 'Virtual Network Computing' },
      6379: { name: 'Redis', protocol: 'TCP', description: 'Redis Database' },
      8080: { name: 'HTTP Alt', protocol: 'TCP', description: 'HTTP Alternate' },
      8443: { name: 'HTTPS Alt', protocol: 'TCP', description: 'HTTPS Alternate' },
      27017: { name: 'MongoDB', protocol: 'TCP', description: 'MongoDB Database' }
    };

    let result = `=== PORT INFORMATION ===\n\n`;
    result += `Port Number: ${portNumber}\n\n`;

    if (commonPorts[portNumber]) {
      const port = commonPorts[portNumber];
      result += `=== SERVICE ===\n`;
      result += `Name: ${port.name}\n`;
      result += `Protocol: ${port.protocol}\n`;
      result += `Description: ${port.description}\n\n`;
    } else {
      result += `No common service found for port ${portNumber}\n\n`;
    }

    // Port range categories
    result += `=== PORT RANGE ===\n`;

    if (portNumber >= 0 && portNumber <= 1023) {
      result += `Category: Well-Known Ports (0-1023)\n`;
      result += `Description: System/privileged services\n`;
      result += `Registration: Assigned by IANA\n`;
    } else if (portNumber >= 1024 && portNumber <= 49151) {
      result += `Category: Registered Ports (1024-49151)\n`;
      result += `Description: User/application services\n`;
      result += `Registration: Registered with IANA\n`;
    } else if (portNumber >= 49152 && portNumber <= 65535) {
      result += `Category: Dynamic/Private Ports (49152-65535)\n`;
      result += `Description: Ephemeral/temporary ports\n`;
      result += `Registration: Not registered\n`;
    } else {
      result += `Invalid port number (must be 0-65535)\n`;
    }

    result += `\n=== COMMON PORTS LIST ===\n`;
    const portList = Object.keys(commonPorts).sort((a, b) => a - b);

    portList.forEach(port => {
      const info = commonPorts[port];
      result += `${port.toString().padEnd(6)} ${info.name.padEnd(20)} ${info.protocol}\n`;
    });

    state.text = result;
  } catch (error) {
    state.postError("Port lookup failed: " + error.message);
  }
}

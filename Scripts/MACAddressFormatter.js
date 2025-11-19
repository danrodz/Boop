/**
  {
    "api": 1,
    "name": "MAC Address Formatter",
    "description": "Format and validate MAC addresses",
    "author": "Boop",
    "icon": "wifi",
    "tags": "mac,address,format,network,ethernet"
  }
**/

function main(state) {
  try {
    let mac = state.text.trim().toUpperCase();

    // Remove common separators
    const cleaned = mac.replace(/[:\-.\s]/g, '');

    // Validate length
    if (cleaned.length !== 12) {
      state.postError("Invalid MAC address (must be 12 hex digits)");
      return;
    }

    // Validate hex characters
    if (!/^[0-9A-F]{12}$/i.test(cleaned)) {
      state.postError("Invalid MAC address (must contain only hex digits)");
      return;
    }

    // Convert to different formats
    const colonSeparated = cleaned.match(/.{2}/g).join(':');
    const hyphenSeparated = cleaned.match(/.{2}/g).join('-');
    const dotSeparated = cleaned.match(/.{4}/g).join('.');
    const cisco = cleaned.match(/.{4}/g).join('.');
    const noSeparator = cleaned;

    // Parse OUI (Organizationally Unique Identifier)
    const oui = cleaned.substring(0, 6);
    const nic = cleaned.substring(6, 12);

    // Check for special addresses
    const binary = parseInt(cleaned, 16).toString(2).padStart(48, '0');
    const isMulticast = binary[7] === '1';
    const isLocal = binary[6] === '1';

    let result = `=== MAC ADDRESS INFO ===\n\n`;
    result += `Original: ${mac}\n\n`;

    result += `=== FORMATS ===\n`;
    result += `Colon-separated: ${colonSeparated}\n`;
    result += `Hyphen-separated: ${hyphenSeparated}\n`;
    result += `Dot-separated: ${dotSeparated}\n`;
    result += `Cisco format: ${cisco}\n`;
    result += `No separator: ${noSeparator}\n\n`;

    result += `=== COMPONENTS ===\n`;
    result += `OUI (Vendor): ${oui}\n`;
    result += `NIC (Device): ${nic}\n\n`;

    result += `=== PROPERTIES ===\n`;
    result += `Type: ${isMulticast ? 'Multicast' : 'Unicast'}\n`;
    result += `Administration: ${isLocal ? 'Locally Administered' : 'Globally Unique'}\n\n`;

    result += `=== BINARY ===\n`;
    result += binary.match(/.{8}/g).join(' ') + '\n\n';

    // Common vendor OUIs (sample)
    const vendors = {
      '00:1A:A0': 'Dell',
      '00:50:56': 'VMware',
      '08:00:27': 'VirtualBox',
      '00:0C:29': 'VMware',
      '00:1B:63': 'Apple',
      '00:16:CB': 'Apple',
      '3C:07:54': 'Apple',
      'FC:FB:FB': 'Apple',
      '00:50:F2': 'Microsoft',
      '00:15:5D': 'Microsoft',
      '00:03:FF': 'Microsoft'
    };

    const ouiFormatted = oui.match(/.{2}/g).join(':');
    const vendor = vendors[ouiFormatted];

    if (vendor) {
      result += `=== VENDOR ===\n${vendor}\n`;
    }

    state.text = result;
  } catch (error) {
    state.postError("MAC formatting failed: " + error.message);
  }
}

/**
	{
		"api":1,
		"name":"IP Address Converter",
		"description":"Converts IPv4 addresses to/from integer, hex, and binary formats",
		"author":"Boop",
		"icon":"network",
		"tags":"ip,address,network,convert,integer,hex,binary"
	}
**/

function main(state) {
	const text = state.text.trim();

	// Check if it's an IP address
	const ipPattern = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
	const ipMatch = text.match(ipPattern);

	if (ipMatch) {
		const [, a, b, c, d] = ipMatch.map(Number);

		// Validate octets
		if (a > 255 || b > 255 || c > 255 || d > 255) {
			state.postError("Invalid IP address (octets must be 0-255)");
			return;
		}

		// Convert to integer
		const integer = (a << 24) + (b << 16) + (c << 8) + d;
		const unsigned = integer >>> 0; // Convert to unsigned

		// Convert to hex
		const hex = '0x' + unsigned.toString(16).toUpperCase().padStart(8, '0');

		// Convert to binary
		const binary = unsigned.toString(2).padStart(32, '0');
		const binaryFormatted = binary.match(/.{8}/g).join('.');

		const result = `IPv4 Address: ${text}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Decimal:  ${unsigned}
Hex:      ${hex}
Binary:   ${binaryFormatted}

Octet Breakdown:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${a}.${b}.${c}.${d}
${a.toString(2).padStart(8, '0')}.${b.toString(2).padStart(8, '0')}.${c.toString(2).padStart(8, '0')}.${d.toString(2).padStart(8, '0')}

Class: ${getIPClass(a)}
Private: ${isPrivate(a, b, c, d) ? 'Yes' : 'No'}`;

		state.text = result;
	}
	// Check if it's an integer
	else if (/^\d+$/.test(text)) {
		const num = parseInt(text) >>> 0;
		const a = (num >>> 24) & 255;
		const b = (num >>> 16) & 255;
		const c = (num >>> 8) & 255;
		const d = num & 255;

		const ip = `${a}.${b}.${c}.${d}`;
		const hex = '0x' + num.toString(16).toUpperCase().padStart(8, '0');
		const binary = num.toString(2).padStart(32, '0').match(/.{8}/g).join('.');

		const result = `Integer: ${num}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
IPv4:     ${ip}
Hex:      ${hex}
Binary:   ${binary}

Class: ${getIPClass(a)}
Private: ${isPrivate(a, b, c, d) ? 'Yes' : 'No'}`;

		state.text = result;
	}
	else {
		state.postError("Input must be an IPv4 address or integer");
	}
}

function getIPClass(firstOctet) {
	if (firstOctet < 128) return 'A';
	if (firstOctet < 192) return 'B';
	if (firstOctet < 224) return 'C';
	if (firstOctet < 240) return 'D (Multicast)';
	return 'E (Reserved)';
}

function isPrivate(a, b, c, d) {
	return (a === 10) ||
	       (a === 172 && b >= 16 && b <= 31) ||
	       (a === 192 && b === 168) ||
	       (a === 127);
}

/**
	{
		"api":1,
		"name":"Generate UUID v5",
		"description":"Generates a namespace-based UUID v5. Input is used as the name. For custom namespace, use format: 'namespace|name'.",
		"author":"Boop",
		"icon":"key",
		"tags":"uuid,generate,hash,guid,identifier,namespace"
	}
**/

function main(state) {
	// Standard UUID v5 namespaces
	const namespaces = {
		'DNS': '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
		'URL': '6ba7b811-9dad-11d1-80b4-00c04fd430c8',
		'OID': '6ba7b812-9dad-11d1-80b4-00c04fd430c8',
		'X500': '6ba7b814-9dad-11d1-80b4-00c04fd430c8'
	};

	let namespace = namespaces.DNS; // Default to DNS namespace
	let name = state.text.trim();

	// Check if user specified a custom namespace
	if (name.includes('|')) {
		const parts = name.split('|');
		const nsInput = parts[0].trim();
		name = parts.slice(1).join('|').trim();

		// Check if it's a standard namespace name or a custom UUID
		if (namespaces[nsInput.toUpperCase()]) {
			namespace = namespaces[nsInput.toUpperCase()];
		} else if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(nsInput)) {
			namespace = nsInput.toLowerCase();
		} else {
			state.postError('Invalid namespace. Use DNS, URL, OID, X500, or a valid UUID.');
			return;
		}
	}

	if (!name) {
		state.postError('Please provide a name. Format: "name" or "namespace|name"');
		return;
	}

	// Convert namespace UUID to bytes
	const nsBytes = uuidToBytes(namespace);

	// Create input for hashing: namespace bytes + name as UTF-8 bytes
	const nameBytes = stringToUTF8Bytes(name);
	const allBytes = nsBytes.concat(nameBytes);

	// Compute SHA-1 hash using a simple implementation
	const hash = sha1(allBytes);

	// Format as UUID v5
	const uuid = formatAsUUIDv5(hash);

	state.text = uuid;
}

function uuidToBytes(uuid) {
	const hex = uuid.replace(/-/g, '');
	const bytes = [];
	for (let i = 0; i < hex.length; i += 2) {
		bytes.push(parseInt(hex.substr(i, 2), 16));
	}
	return bytes;
}

function stringToUTF8Bytes(str) {
	const bytes = [];
	for (let i = 0; i < str.length; i++) {
		const code = str.charCodeAt(i);
		if (code < 128) {
			bytes.push(code);
		} else if (code < 2048) {
			bytes.push(192 + (code >> 6));
			bytes.push(128 + (code & 63));
		} else if (code < 65536) {
			bytes.push(224 + (code >> 12));
			bytes.push(128 + ((code >> 6) & 63));
			bytes.push(128 + (code & 63));
		} else {
			bytes.push(240 + (code >> 18));
			bytes.push(128 + ((code >> 12) & 63));
			bytes.push(128 + ((code >> 6) & 63));
			bytes.push(128 + (code & 63));
		}
	}
	return bytes;
}

// Simple SHA-1 implementation
function sha1(bytes) {
	// Convert bytes to 32-bit words
	const words = [];
	for (let i = 0; i < bytes.length; i += 4) {
		words.push(
			(bytes[i] << 24) |
			(bytes[i + 1] << 16) |
			(bytes[i + 2] << 8) |
			(bytes[i + 3] || 0)
		);
	}

	// Padding
	const bitLength = bytes.length * 8;
	words[bytes.length >> 2] |= 0x80 << (24 - (bytes.length % 4) * 8);
	words[(((bytes.length + 8) >> 6) << 4) + 15] = bitLength;

	// SHA-1 constants
	const h = [0x67452301, 0xEFCDAB89, 0x98BADCFE, 0x10325476, 0xC3D2E1F0];

	// Process each 512-bit chunk
	for (let i = 0; i < words.length; i += 16) {
		const w = words.slice(i, i + 16);

		// Extend to 80 words
		for (let j = 16; j < 80; j++) {
			w[j] = rotl(w[j-3] ^ w[j-8] ^ w[j-14] ^ w[j-16], 1);
		}

		let [a, b, c, d, e] = h;

		for (let j = 0; j < 80; j++) {
			let f, k;
			if (j < 20) {
				f = (b & c) | ((~b) & d);
				k = 0x5A827999;
			} else if (j < 40) {
				f = b ^ c ^ d;
				k = 0x6ED9EBA1;
			} else if (j < 60) {
				f = (b & c) | (b & d) | (c & d);
				k = 0x8F1BBCDC;
			} else {
				f = b ^ c ^ d;
				k = 0xCA62C1D6;
			}

			const temp = (rotl(a, 5) + f + e + k + w[j]) | 0;
			e = d;
			d = c;
			c = rotl(b, 30);
			b = a;
			a = temp;
		}

		h[0] = (h[0] + a) | 0;
		h[1] = (h[1] + b) | 0;
		h[2] = (h[2] + c) | 0;
		h[3] = (h[3] + d) | 0;
		h[4] = (h[4] + e) | 0;
	}

	// Convert to hex string
	return h.map(n => {
		const hex = (n >>> 0).toString(16);
		return '00000000'.substring(0, 8 - hex.length) + hex;
	}).join('');
}

function rotl(n, s) {
	return (n << s) | (n >>> (32 - s));
}

function formatAsUUIDv5(hash) {
	// Take first 32 hex characters (16 bytes)
	let hex = hash.substring(0, 32);

	// Set version to 5 (0101 in binary) in the 13th hex char (bits 48-51)
	hex = hex.substring(0, 12) + '5' + hex.substring(13);

	// Set variant to RFC 4122 (10xx in binary) in the 17th hex char (bits 64-65)
	const variantChar = parseInt(hex.charAt(16), 16);
	const newVariant = (variantChar & 0x3) | 0x8; // Set to 10xx
	hex = hex.substring(0, 16) + newVariant.toString(16) + hex.substring(17);

	// Format with hyphens
	return hex.substring(0, 8) + '-' +
	       hex.substring(8, 12) + '-' +
	       hex.substring(12, 16) + '-' +
	       hex.substring(16, 20) + '-' +
	       hex.substring(20, 32);
}

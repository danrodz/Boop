/**
	{
		"api":1,
		"name":"Base32 Decode",
		"description":"Decodes your text from Base32 (RFC 4648)",
		"author":"danrodz",
		"icon":"metamorphose",
		"tags":"base32,decode"
	}
**/

function main(input) {
	try {
		input.text = base32Decode(input.text);
	} catch (error) {
		input.postError("Failed to decode: " + error.message);
	}
}

function base32Decode(text) {
	const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
	const cleaned = text.replace(/=+$/, '').toUpperCase();
	let bits = '';

	// Convert each character to 5 bits
	for (let i = 0; i < cleaned.length; i++) {
		const char = cleaned[i];
		const value = alphabet.indexOf(char);

		if (value === -1) {
			throw new Error("Invalid Base32 character: " + char);
		}

		bits += value.toString(2).padStart(5, '0');
	}

	// Convert bits to bytes
	const bytes = [];
	for (let i = 0; i < bits.length; i += 8) {
		if (i + 8 <= bits.length) {
			const byte = parseInt(bits.slice(i, i + 8), 2);
			bytes.push(byte);
		}
	}

	// Decode UTF-8 bytes to string
	let result = '';
	let i = 0;
	while (i < bytes.length) {
		const byte = bytes[i];
		if (byte < 128) {
			result += String.fromCharCode(byte);
			i++;
		} else if (byte < 224) {
			result += String.fromCharCode(((byte & 31) << 6) | (bytes[i + 1] & 63));
			i += 2;
		} else if (byte < 240) {
			result += String.fromCharCode(((byte & 15) << 12) | ((bytes[i + 1] & 63) << 6) | (bytes[i + 2] & 63));
			i += 3;
		} else {
			const codePoint = ((byte & 7) << 18) | ((bytes[i + 1] & 63) << 12) | ((bytes[i + 2] & 63) << 6) | (bytes[i + 3] & 63);
			result += String.fromCodePoint(codePoint);
			i += 4;
		}
	}

	return result;
}

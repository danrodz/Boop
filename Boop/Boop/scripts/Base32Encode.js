/**
	{
		"api":1,
		"name":"Base32 Encode",
		"description":"Encodes your text to Base32 (RFC 4648)",
		"author":"Boop",
		"icon":"metamorphose",
		"tags":"base32,encode"
	}
**/

function main(input) {
	try {
		input.text = base32Encode(input.text);
	} catch (error) {
		input.postError("Failed to encode: " + error.message);
	}
}

function base32Encode(text) {
	const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
	const bytes = [];

	// Convert string to UTF-8 bytes
	for (let i = 0; i < text.length; i++) {
		const charCode = text.charCodeAt(i);
		if (charCode < 128) {
			bytes.push(charCode);
		} else if (charCode < 2048) {
			bytes.push(192 | (charCode >> 6));
			bytes.push(128 | (charCode & 63));
		} else if (charCode < 65536) {
			bytes.push(224 | (charCode >> 12));
			bytes.push(128 | ((charCode >> 6) & 63));
			bytes.push(128 | (charCode & 63));
		} else {
			bytes.push(240 | (charCode >> 18));
			bytes.push(128 | ((charCode >> 12) & 63));
			bytes.push(128 | ((charCode >> 6) & 63));
			bytes.push(128 | (charCode & 63));
		}
	}

	let bits = '';
	let result = '';

	// Convert bytes to bits
	for (let i = 0; i < bytes.length; i++) {
		bits += bytes[i].toString(2).padStart(8, '0');
	}

	// Split into 5-bit chunks and encode
	for (let i = 0; i < bits.length; i += 5) {
		const chunk = bits.slice(i, i + 5).padEnd(5, '0');
		const value = parseInt(chunk, 2);
		result += alphabet[value];
	}

	// Add padding
	while (result.length % 8 !== 0) {
		result += '=';
	}

	return result;
}

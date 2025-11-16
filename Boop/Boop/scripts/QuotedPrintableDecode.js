/**
	{
		"api":1,
		"name":"Quoted-Printable Decode",
		"description":"Decodes Quoted-Printable format (RFC 2045) used in email",
		"author":"Boop",
		"icon":"metamorphose",
		"tags":"quoted-printable,email,mime,decode"
	}
**/

function main(input) {
	try {
		input.text = quotedPrintableDecode(input.text);
	} catch (error) {
		input.postError("Failed to decode: " + error.message);
	}
}

function quotedPrintableDecode(text) {
	const bytes = [];
	let i = 0;

	while (i < text.length) {
		const char = text[i];

		if (char === '=') {
			// Check for soft line break (= at end of line)
			if (i + 1 < text.length && text[i + 1] === '\r' && i + 2 < text.length && text[i + 2] === '\n') {
				// Soft line break - skip it
				i += 3;
			} else if (i + 1 < text.length && text[i + 1] === '\n') {
				// Soft line break with just LF
				i += 2;
			} else if (i + 2 < text.length) {
				// Encoded byte
				const hex = text.slice(i + 1, i + 3);
				const byte = parseInt(hex, 16);

				if (isNaN(byte)) {
					throw new Error("Invalid quoted-printable encoding at position " + i);
				}

				bytes.push(byte);
				i += 3;
			} else {
				throw new Error("Incomplete encoding at end of input");
			}
		} else {
			// Regular character
			bytes.push(char.charCodeAt(0));
			i++;
		}
	}

	// Decode UTF-8 bytes to string
	let result = '';
	i = 0;
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

/**
	{
		"api":1,
		"name":"Quoted-Printable Encode",
		"description":"Encodes text to Quoted-Printable format (RFC 2045) used in email",
		"author":"Boop",
		"icon":"metamorphose",
		"tags":"quoted-printable,email,mime,encode"
	}
**/

function main(input) {
	try {
		input.text = quotedPrintableEncode(input.text);
	} catch (error) {
		input.postError("Failed to encode: " + error.message);
	}
}

function quotedPrintableEncode(text) {
	// Convert string to UTF-8 bytes
	const bytes = [];
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

	let result = '';
	let lineLength = 0;
	const maxLineLength = 76;

	for (let i = 0; i < bytes.length; i++) {
		const byte = bytes[i];

		// Check if character needs encoding
		if (byte === 32) {
			// Space - only encode at end of line
			if (i + 1 < bytes.length && bytes[i + 1] !== 13 && bytes[i + 1] !== 10) {
				result += ' ';
				lineLength++;
			} else {
				result += '=20';
				lineLength += 3;
			}
		} else if (byte === 9) {
			// Tab - only encode at end of line
			if (i + 1 < bytes.length && bytes[i + 1] !== 13 && bytes[i + 1] !== 10) {
				result += '\t';
				lineLength++;
			} else {
				result += '=09';
				lineLength += 3;
			}
		} else if (byte === 13 && i + 1 < bytes.length && bytes[i + 1] === 10) {
			// CRLF - preserve as-is
			result += '\r\n';
			lineLength = 0;
			i++; // Skip the LF
		} else if (byte === 10) {
			// LF alone
			result += '\n';
			lineLength = 0;
		} else if ((byte >= 33 && byte <= 60) || (byte >= 62 && byte <= 126)) {
			// Printable characters except '='
			result += String.fromCharCode(byte);
			lineLength++;
		} else {
			// Encode as =XX
			const hex = byte.toString(16).toUpperCase().padStart(2, '0');
			result += '=' + hex;
			lineLength += 3;
		}

		// Soft line break if line too long
		if (lineLength >= maxLineLength - 3 && i + 1 < bytes.length) {
			result += '=\r\n';
			lineLength = 0;
		}
	}

	return result;
}

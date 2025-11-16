/**
	{
		"api":1,
		"name":"JWT Encode",
		"description":"Creates a JWT token (HS256) from JSON payload. Use default secret or provide as 'secret|payload'",
		"author":"Boop",
		"icon":"identification",
		"tags":"jwt,encode,token,hs256"
	}
**/

function main(state) {
	try {
		const DEFAULT_SECRET = "boop-secret-key";
		let secret = DEFAULT_SECRET;
		let payloadText = state.text;

		// Check if user provided secret|payload format
		if (state.text.includes('|')) {
			const parts = state.text.split('|');
			secret = parts[0];
			payloadText = parts.slice(1).join('|');
		}

		// Parse payload JSON
		let payload;
		try {
			payload = JSON.parse(payloadText);
		} catch (e) {
			state.postError("Invalid JSON payload. Provide valid JSON or 'secret|{\"key\":\"value\"}'");
			return;
		}

		// Base64URL encode function
		function base64urlEncode(str) {
			const base64chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
			let result = '';
			let i = 0;

			// Convert string to UTF-8 bytes
			const utf8 = unescape(encodeURIComponent(str));

			for (i = 0; i < utf8.length; i += 3) {
				const byte1 = utf8.charCodeAt(i);
				const byte2 = i + 1 < utf8.length ? utf8.charCodeAt(i + 1) : 0;
				const byte3 = i + 2 < utf8.length ? utf8.charCodeAt(i + 2) : 0;

				const encoded1 = byte1 >> 2;
				const encoded2 = ((byte1 & 0x03) << 4) | (byte2 >> 4);
				const encoded3 = ((byte2 & 0x0F) << 2) | (byte3 >> 6);
				const encoded4 = byte3 & 0x3F;

				result += base64chars.charAt(encoded1) + base64chars.charAt(encoded2);
				result += (i + 1 < utf8.length) ? base64chars.charAt(encoded3) : '';
				result += (i + 2 < utf8.length) ? base64chars.charAt(encoded4) : '';
			}

			// Convert to base64url (remove padding, replace +/ with -_)
			return result.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
		}

		// SHA256 implementation
		function sha256(message) {
			// SHA256 constants
			const K = [
				0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
				0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
				0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
				0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
				0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
				0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
				0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
				0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
			];

			function rotr(n, x) { return (x >>> n) | (x << (32 - n)); }
			function shr(n, x) { return x >>> n; }

			// Convert message to bytes
			const utf8 = unescape(encodeURIComponent(message));
			const msgBytes = [];
			for (let i = 0; i < utf8.length; i++) {
				msgBytes.push(utf8.charCodeAt(i));
			}

			// Padding
			const msgLen = msgBytes.length;
			const bitLenHi = Math.floor(msgLen * 8 / 0x100000000);
			const bitLenLo = (msgLen * 8) >>> 0;
			msgBytes.push(0x80);
			while ((msgBytes.length % 64) !== 56) {
				msgBytes.push(0x00);
			}

			// Append length as 64-bit big-endian
			for (let i = 3; i >= 0; i--) msgBytes.push((bitLenHi >>> (i * 8)) & 0xff);
			for (let i = 3; i >= 0; i--) msgBytes.push((bitLenLo >>> (i * 8)) & 0xff);

			// Process message in 512-bit chunks
			let h0 = 0x6a09e667, h1 = 0xbb67ae85, h2 = 0x3c6ef372, h3 = 0xa54ff53a;
			let h4 = 0x510e527f, h5 = 0x9b05688c, h6 = 0x1f83d9ab, h7 = 0x5be0cd19;

			for (let chunk = 0; chunk < msgBytes.length; chunk += 64) {
				const w = new Array(64);

				// Break chunk into sixteen 32-bit big-endian words
				for (let i = 0; i < 16; i++) {
					const offset = chunk + i * 4;
					w[i] = (msgBytes[offset] << 24) | (msgBytes[offset + 1] << 16) |
						(msgBytes[offset + 2] << 8) | msgBytes[offset + 3];
				}

				// Extend the sixteen 32-bit words into sixty-four 32-bit words
				for (let i = 16; i < 64; i++) {
					const s0 = rotr(7, w[i - 15]) ^ rotr(18, w[i - 15]) ^ shr(3, w[i - 15]);
					const s1 = rotr(17, w[i - 2]) ^ rotr(19, w[i - 2]) ^ shr(10, w[i - 2]);
					w[i] = (w[i - 16] + s0 + w[i - 7] + s1) >>> 0;
				}

				// Initialize working variables
				let a = h0, b = h1, c = h2, d = h3, e = h4, f = h5, g = h6, h = h7;

				// Main loop
				for (let i = 0; i < 64; i++) {
					const S1 = rotr(6, e) ^ rotr(11, e) ^ rotr(25, e);
					const ch = (e & f) ^ ((~e) & g);
					const temp1 = (h + S1 + ch + K[i] + w[i]) >>> 0;
					const S0 = rotr(2, a) ^ rotr(13, a) ^ rotr(22, a);
					const maj = (a & b) ^ (a & c) ^ (b & c);
					const temp2 = (S0 + maj) >>> 0;

					h = g;
					g = f;
					f = e;
					e = (d + temp1) >>> 0;
					d = c;
					c = b;
					b = a;
					a = (temp1 + temp2) >>> 0;
				}

				// Add compressed chunk to hash values
				h0 = (h0 + a) >>> 0;
				h1 = (h1 + b) >>> 0;
				h2 = (h2 + c) >>> 0;
				h3 = (h3 + d) >>> 0;
				h4 = (h4 + e) >>> 0;
				h5 = (h5 + f) >>> 0;
				h6 = (h6 + g) >>> 0;
				h7 = (h7 + h) >>> 0;
			}

			// Produce final hash as byte array
			const hash = [];
			[h0, h1, h2, h3, h4, h5, h6, h7].forEach(h => {
				hash.push((h >>> 24) & 0xff, (h >>> 16) & 0xff, (h >>> 8) & 0xff, h & 0xff);
			});

			return hash;
		}

		// HMAC-SHA256
		function hmacSha256(key, message) {
			const blockSize = 64; // SHA256 block size
			let keyBytes = [];

			// Convert key to bytes
			const utf8Key = unescape(encodeURIComponent(key));
			for (let i = 0; i < utf8Key.length; i++) {
				keyBytes.push(utf8Key.charCodeAt(i));
			}

			// Hash key if longer than block size
			if (keyBytes.length > blockSize) {
				keyBytes = sha256(key);
			}

			// Pad key to block size
			while (keyBytes.length < blockSize) {
				keyBytes.push(0x00);
			}

			// Create inner and outer padded keys
			const innerKey = keyBytes.map(b => b ^ 0x36);
			const outerKey = keyBytes.map(b => b ^ 0x5c);

			// Convert message to bytes for inner hash
			const utf8Msg = unescape(encodeURIComponent(message));
			const msgBytes = [];
			for (let i = 0; i < utf8Msg.length; i++) {
				msgBytes.push(utf8Msg.charCodeAt(i));
			}

			// Inner hash: H(K XOR ipad, message)
			const innerMsg = String.fromCharCode.apply(null, innerKey.concat(msgBytes));
			const innerHash = sha256(innerMsg);

			// Outer hash: H(K XOR opad, innerHash)
			const outerMsg = String.fromCharCode.apply(null, outerKey.concat(innerHash));
			return sha256(outerMsg);
		}

		// Create JWT header
		const header = {
			"alg": "HS256",
			"typ": "JWT"
		};

		const headerEncoded = base64urlEncode(JSON.stringify(header));
		const payloadEncoded = base64urlEncode(JSON.stringify(payload));

		// Create signature
		const signatureInput = headerEncoded + '.' + payloadEncoded;
		const signatureBytes = hmacSha256(secret, signatureInput);

		// Convert signature bytes to base64url
		let signatureBase64 = '';
		for (let i = 0; i < signatureBytes.length; i += 3) {
			const byte1 = signatureBytes[i];
			const byte2 = i + 1 < signatureBytes.length ? signatureBytes[i + 1] : 0;
			const byte3 = i + 2 < signatureBytes.length ? signatureBytes[i + 2] : 0;

			const triplet = (byte1 << 16) | (byte2 << 8) | byte3;

			const base64chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
			signatureBase64 += base64chars.charAt((triplet >> 18) & 0x3F);
			signatureBase64 += base64chars.charAt((triplet >> 12) & 0x3F);
			signatureBase64 += (i + 1 < signatureBytes.length) ? base64chars.charAt((triplet >> 6) & 0x3F) : '';
			signatureBase64 += (i + 2 < signatureBytes.length) ? base64chars.charAt(triplet & 0x3F) : '';
		}

		const signatureEncoded = signatureBase64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');

		// Assemble JWT
		state.text = headerEncoded + '.' + payloadEncoded + '.' + signatureEncoded;

	} catch (error) {
		state.postError("Error creating JWT: " + error.message);
	}
}

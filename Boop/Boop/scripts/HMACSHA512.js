/**
	{
		"api":1,
		"name":"HMAC-SHA512",
		"description":"Generates HMAC-SHA512 (hex). Input format: 'key|message' or use default key",
		"author":"Boop",
		"icon":"fingerprint",
		"tags":"hmac,sha512,hash,authentication"
	}
**/

function main(state) {
	try {
		const DEFAULT_KEY = "boop-hmac-key";
		let key = DEFAULT_KEY;
		let message = state.text;

		// Check if user provided key|message format
		if (state.text.includes('|')) {
			const parts = state.text.split('|');
			key = parts[0];
			message = parts.slice(1).join('|');
		}

		// SHA512 implementation - accepts string or byte array
		function sha512(input) {
			// SHA512 constants (64-bit values represented as [high, low] pairs)
			const K = [
				[0x428a2f98, 0xd728ae22], [0x71374491, 0x23ef65cd], [0xb5c0fbcf, 0xec4d3b2f], [0xe9b5dba5, 0x8189dbbc],
				[0x3956c25b, 0xf348b538], [0x59f111f1, 0xb605d019], [0x923f82a4, 0xaf194f9b], [0xab1c5ed5, 0xda6d8118],
				[0xd807aa98, 0xa3030242], [0x12835b01, 0x45706fbe], [0x243185be, 0x4ee4b28c], [0x550c7dc3, 0xd5ffb4e2],
				[0x72be5d74, 0xf27b896f], [0x80deb1fe, 0x3b1696b1], [0x9bdc06a7, 0x25c71235], [0xc19bf174, 0xcf692694],
				[0xe49b69c1, 0x9ef14ad2], [0xefbe4786, 0x384f25e3], [0x0fc19dc6, 0x8b8cd5b5], [0x240ca1cc, 0x77ac9c65],
				[0x2de92c6f, 0x592b0275], [0x4a7484aa, 0x6ea6e483], [0x5cb0a9dc, 0xbd41fbd4], [0x76f988da, 0x831153b5],
				[0x983e5152, 0xee66dfab], [0xa831c66d, 0x2db43210], [0xb00327c8, 0x98fb213f], [0xbf597fc7, 0xbeef0ee4],
				[0xc6e00bf3, 0x3da88fc2], [0xd5a79147, 0x930aa725], [0x06ca6351, 0xe003826f], [0x14292967, 0x0a0e6e70],
				[0x27b70a85, 0x46d22ffc], [0x2e1b2138, 0x5c26c926], [0x4d2c6dfc, 0x5ac42aed], [0x53380d13, 0x9d95b3df],
				[0x650a7354, 0x8baf63de], [0x766a0abb, 0x3c77b2a8], [0x81c2c92e, 0x47edaee6], [0x92722c85, 0x1482353b],
				[0xa2bfe8a1, 0x4cf10364], [0xa81a664b, 0xbc423001], [0xc24b8b70, 0xd0f89791], [0xc76c51a3, 0x0654be30],
				[0xd192e819, 0xd6ef5218], [0xd6990624, 0x5565a910], [0xf40e3585, 0x5771202a], [0x106aa070, 0x32bbd1b8],
				[0x19a4c116, 0xb8d2d0c8], [0x1e376c08, 0x5141ab53], [0x2748774c, 0xdf8eeb99], [0x34b0bcb5, 0xe19b48a8],
				[0x391c0cb3, 0xc5c95a63], [0x4ed8aa4a, 0xe3418acb], [0x5b9cca4f, 0x7763e373], [0x682e6ff3, 0xd6b2b8a3],
				[0x748f82ee, 0x5defb2fc], [0x78a5636f, 0x43172f60], [0x84c87814, 0xa1f0ab72], [0x8cc70208, 0x1a6439ec],
				[0x90befffa, 0x23631e28], [0xa4506ceb, 0xde82bde9], [0xbef9a3f7, 0xb2c67915], [0xc67178f2, 0xe372532b],
				[0xca273ece, 0xea26619c], [0xd186b8c7, 0x21c0c207], [0xeada7dd6, 0xcde0eb1e], [0xf57d4f7f, 0xee6ed178],
				[0x06f067aa, 0x72176fba], [0x0a637dc5, 0xa2c898a6], [0x113f9804, 0xbef90dae], [0x1b710b35, 0x131c471b],
				[0x28db77f5, 0x23047d84], [0x32caab7b, 0x40c72493], [0x3c9ebe0a, 0x15c9bebc], [0x431d67c4, 0x9c100d4c],
				[0x4cc5d4be, 0xcb3e42b6], [0x597f299c, 0xfc657e2a], [0x5fcb6fab, 0x3ad6faec], [0x6c44198c, 0x4a475817]
			];

			// 64-bit operations
			function rotr64(n, xh, xl) {
				if (n < 32) {
					return [(xh >>> n) | (xl << (32 - n)), (xl >>> n) | (xh << (32 - n))];
				} else {
					n -= 32;
					return [(xl >>> n) | (xh << (32 - n)), (xh >>> n) | (xl << (32 - n))];
				}
			}

			function shr64(n, xh, xl) {
				if (n < 32) {
					return [(xh >>> n), (xl >>> n) | (xh << (32 - n))];
				} else {
					return [0, (xh >>> (n - 32))];
				}
			}

			function add64(ah, al, bh, bl) {
				const l = (al + bl) >>> 0;
				const h = (ah + bh + (l < al ? 1 : 0)) >>> 0;
				return [h, l];
			}

			function add64_5(ah, al, bh, bl, ch, cl, dh, dl, eh, el) {
				let [h, l] = add64(ah, al, bh, bl);
				[h, l] = add64(h, l, ch, cl);
				[h, l] = add64(h, l, dh, dl);
				[h, l] = add64(h, l, eh, el);
				return [h, l];
			}

			// Convert input to bytes
			let msgBytes;
			if (Array.isArray(input)) {
				// Already a byte array
				msgBytes = input.slice();
			} else {
				// String - convert to UTF-8 bytes
				const utf8 = unescape(encodeURIComponent(input));
				msgBytes = [];
				for (let i = 0; i < utf8.length; i++) {
					msgBytes.push(utf8.charCodeAt(i));
				}
			}

			// Padding
			const msgLen = msgBytes.length;
			const bitLenHi = Math.floor(msgLen * 8 / 0x100000000);
			const bitLenLo = (msgLen * 8) >>> 0;
			msgBytes.push(0x80);
			while ((msgBytes.length % 128) !== 112) {
				msgBytes.push(0x00);
			}

			// Append length as 128-bit big-endian (16 bytes)
			for (let i = 7; i >= 0; i--) msgBytes.push(0); // High 64 bits (always 0 for realistic message sizes)
			for (let i = 3; i >= 0; i--) msgBytes.push((bitLenHi >>> (i * 8)) & 0xff);
			for (let i = 3; i >= 0; i--) msgBytes.push((bitLenLo >>> (i * 8)) & 0xff);

			// Initial hash values
			let h0h = 0x6a09e667, h0l = 0xf3bcc908;
			let h1h = 0xbb67ae85, h1l = 0x84caa73b;
			let h2h = 0x3c6ef372, h2l = 0xfe94f82b;
			let h3h = 0xa54ff53a, h3l = 0x5f1d36f1;
			let h4h = 0x510e527f, h4l = 0xade682d1;
			let h5h = 0x9b05688c, h5l = 0x2b3e6c1f;
			let h6h = 0x1f83d9ab, h6l = 0xfb41bd6b;
			let h7h = 0x5be0cd19, h7l = 0x137e2179;

			// Process message in 1024-bit chunks
			for (let chunk = 0; chunk < msgBytes.length; chunk += 128) {
				const w = new Array(80);

				// Break chunk into sixteen 64-bit big-endian words
				for (let i = 0; i < 16; i++) {
					const offset = chunk + i * 8;
					const wh = (msgBytes[offset] << 24) | (msgBytes[offset + 1] << 16) |
						(msgBytes[offset + 2] << 8) | msgBytes[offset + 3];
					const wl = (msgBytes[offset + 4] << 24) | (msgBytes[offset + 5] << 16) |
						(msgBytes[offset + 6] << 8) | msgBytes[offset + 7];
					w[i] = [wh, wl];
				}

				// Extend into 80 words
				for (let i = 16; i < 80; i++) {
					let [s0h, s0l] = rotr64(1, w[i - 15][0], w[i - 15][1]);
					let [t1h, t1l] = rotr64(8, w[i - 15][0], w[i - 15][1]);
					let [t2h, t2l] = shr64(7, w[i - 15][0], w[i - 15][1]);
					s0h = (s0h ^ t1h ^ t2h) >>> 0;
					s0l = (s0l ^ t1l ^ t2l) >>> 0;

					let [s1h, s1l] = rotr64(19, w[i - 2][0], w[i - 2][1]);
					[t1h, t1l] = rotr64(61, w[i - 2][0], w[i - 2][1]);
					[t2h, t2l] = shr64(6, w[i - 2][0], w[i - 2][1]);
					s1h = (s1h ^ t1h ^ t2h) >>> 0;
					s1l = (s1l ^ t1l ^ t2l) >>> 0;

					const [wh, wl] = add64_5(
						w[i - 16][0], w[i - 16][1],
						s0h, s0l,
						w[i - 7][0], w[i - 7][1],
						s1h, s1l,
						0, 0
					);
					w[i] = [wh, wl];
				}

				// Initialize working variables
				let ah = h0h, al = h0l, bh = h1h, bl = h1l, ch = h2h, cl = h2l, dh = h3h, dl = h3l;
				let eh = h4h, el = h4l, fh = h5h, fl = h5l, gh = h6h, gl = h6l, hh = h7h, hl = h7l;

				// Main loop
				for (let i = 0; i < 80; i++) {
					let [S1h, S1l] = rotr64(14, eh, el);
					let [t1h, t1l] = rotr64(18, eh, el);
					let [t2h, t2l] = rotr64(41, eh, el);
					S1h = (S1h ^ t1h ^ t2h) >>> 0;
					S1l = (S1l ^ t1l ^ t2l) >>> 0;

					const chh = ((eh & fh) ^ (~eh & gh)) >>> 0;
					const chl = ((el & fl) ^ (~el & gl)) >>> 0;

					let [temp1h, temp1l] = add64_5(hh, hl, S1h, S1l, chh, chl, K[i][0], K[i][1], w[i][0], w[i][1]);

					let [S0h, S0l] = rotr64(28, ah, al);
					[t1h, t1l] = rotr64(34, ah, al);
					[t2h, t2l] = rotr64(39, ah, al);
					S0h = (S0h ^ t1h ^ t2h) >>> 0;
					S0l = (S0l ^ t1l ^ t2l) >>> 0;

					const majh = ((ah & bh) ^ (ah & ch) ^ (bh & ch)) >>> 0;
					const majl = ((al & bl) ^ (al & cl) ^ (bl & cl)) >>> 0;

					const [temp2h, temp2l] = add64(S0h, S0l, majh, majl);

					hh = gh; hl = gl;
					gh = fh; gl = fl;
					fh = eh; fl = el;
					[eh, el] = add64(dh, dl, temp1h, temp1l);
					dh = ch; dl = cl;
					ch = bh; cl = bl;
					bh = ah; bl = al;
					[ah, al] = add64(temp1h, temp1l, temp2h, temp2l);
				}

				// Add chunk hash to result
				[h0h, h0l] = add64(h0h, h0l, ah, al);
				[h1h, h1l] = add64(h1h, h1l, bh, bl);
				[h2h, h2l] = add64(h2h, h2l, ch, cl);
				[h3h, h3l] = add64(h3h, h3l, dh, dl);
				[h4h, h4l] = add64(h4h, h4l, eh, el);
				[h5h, h5l] = add64(h5h, h5l, fh, fl);
				[h6h, h6l] = add64(h6h, h6l, gh, gl);
				[h7h, h7l] = add64(h7h, h7l, hh, hl);
			}

			// Produce final hash as byte array
			const hash = [];
			[[h0h, h0l], [h1h, h1l], [h2h, h2l], [h3h, h3l], [h4h, h4l], [h5h, h5l], [h6h, h6l], [h7h, h7l]].forEach(([hh, hl]) => {
				hash.push((hh >>> 24) & 0xff, (hh >>> 16) & 0xff, (hh >>> 8) & 0xff, hh & 0xff);
				hash.push((hl >>> 24) & 0xff, (hl >>> 16) & 0xff, (hl >>> 8) & 0xff, hl & 0xff);
			});

			return hash;
		}

		// HMAC-SHA512
		function hmacSha512(key, message) {
			const blockSize = 128; // SHA512 block size
			let keyBytes = [];

			// Convert key to bytes
			const utf8Key = unescape(encodeURIComponent(key));
			for (let i = 0; i < utf8Key.length; i++) {
				keyBytes.push(utf8Key.charCodeAt(i));
			}

			// Hash key if longer than block size
			if (keyBytes.length > blockSize) {
				keyBytes = sha512(key);
			}

			// Pad key to block size
			while (keyBytes.length < blockSize) {
				keyBytes.push(0x00);
			}

			// Create inner and outer padded keys
			const innerKey = keyBytes.map(b => b ^ 0x36);
			const outerKey = keyBytes.map(b => b ^ 0x5c);

			// Convert message to bytes
			const utf8Msg = unescape(encodeURIComponent(message));
			const msgBytes = [];
			for (let i = 0; i < utf8Msg.length; i++) {
				msgBytes.push(utf8Msg.charCodeAt(i));
			}

			// Inner hash: H(K XOR ipad || message) - pass as byte array
			const innerHash = sha512(innerKey.concat(msgBytes));

			// Outer hash: H(K XOR opad || innerHash) - pass as byte array
			return sha512(outerKey.concat(innerHash));
		}

		// Calculate HMAC and convert to hex
		const hmacBytes = hmacSha512(key, message);
		const hmacHex = hmacBytes.map(b => b.toString(16).padStart(2, '0')).join('');

		state.text = hmacHex.toUpperCase();

	} catch (error) {
		state.postError("Error calculating HMAC-SHA512: " + error.message);
	}
}

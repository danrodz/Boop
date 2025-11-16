/**
	{
		"api":1,
		"name":"Punycode Encode",
		"description":"Encodes internationalized domain names to ASCII (café.com → xn--caf-dma.com)",
		"author":"danrodz",
		"icon":"link",
		"tags":"punycode,idn,domain,encode,international"
	}
**/

function main(input) {
	try {
		input.text = punycodeEncode(input.text);
	} catch (error) {
		input.postError("Failed to encode: " + error.message);
	}
}

function punycodeEncode(input) {
	// Split domain into labels
	const labels = input.split('.');
	const encoded = labels.map(label => {
		// Only encode if contains non-ASCII characters
		if (/^[\x00-\x7F]*$/.test(label)) {
			return label;
		}
		return 'xn--' + encodePunycodeLabel(label);
	});

	return encoded.join('.');
}

function encodePunycodeLabel(label) {
	const base = 36;
	const tmin = 1;
	const tmax = 26;
	const skew = 38;
	const damp = 700;
	const initialBias = 72;
	const initialN = 0x80;

	let n = initialN;
	let delta = 0;
	let bias = initialBias;
	let output = '';

	// Extract basic code points (ASCII)
	const basic = label.split('').filter(c => c.charCodeAt(0) < 0x80);
	const basicLength = basic.length;
	output = basic.join('');

	let h = basicLength;
	const inputLength = label.length;

	if (basicLength > 0) {
		output += '-';
	}

	while (h < inputLength) {
		// Find smallest code point >= n
		let m = 0x10FFFF;
		for (let i = 0; i < label.length; i++) {
			const c = label.charCodeAt(i);
			if (c >= n && c < m) {
				m = c;
			}
		}

		delta += (m - n) * (h + 1);
		n = m;

		for (let i = 0; i < label.length; i++) {
			const c = label.charCodeAt(i);

			if (c < n) {
				delta++;
			} else if (c === n) {
				let q = delta;
				for (let k = base; ; k += base) {
					const t = k <= bias ? tmin : (k >= bias + tmax ? tmax : k - bias);
					if (q < t) break;

					const digit = t + ((q - t) % (base - t));
					output += encodeDigit(digit);
					q = Math.floor((q - t) / (base - t));
				}

				output += encodeDigit(q);
				bias = adapt(delta, h + 1, h === basicLength);
				delta = 0;
				h++;
			}
		}

		delta++;
		n++;
	}

	return output;
}

function encodeDigit(d) {
	return String.fromCharCode(d + 22 + 75 * (d < 26 ? 1 : 0));
}

function adapt(delta, numPoints, firstTime) {
	const base = 36;
	const tmin = 1;
	const tmax = 26;
	const skew = 38;
	const damp = 700;

	delta = firstTime ? Math.floor(delta / damp) : delta >> 1;
	delta += Math.floor(delta / numPoints);

	let k = 0;
	while (delta > ((base - tmin) * tmax) >> 1) {
		delta = Math.floor(delta / (base - tmin));
		k += base;
	}

	return Math.floor(k + (base - tmin + 1) * delta / (delta + skew));
}

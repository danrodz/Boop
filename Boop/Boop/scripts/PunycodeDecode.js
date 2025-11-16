/**
	{
		"api":1,
		"name":"Punycode Decode",
		"description":"Decodes punycode domain names to internationalized format (xn--caf-dma.com → café.com)",
		"author":"danrodz",
		"icon":"link",
		"tags":"punycode,idn,domain,decode,international"
	}
**/

function main(input) {
	try {
		input.text = punycodeDecode(input.text);
	} catch (error) {
		input.postError("Failed to decode: " + error.message);
	}
}

function punycodeDecode(input) {
	// Split domain into labels
	const labels = input.split('.');
	const decoded = labels.map(label => {
		// Only decode if starts with xn--
		if (label.toLowerCase().startsWith('xn--')) {
			const labelLower = label.toLowerCase();
			return decodePunycodeLabel(labelLower.slice(4));
		}
		return label;
	});

	return decoded.join('.');
}

function decodePunycodeLabel(encoded) {
	const base = 36;
	const tmin = 1;
	const tmax = 26;
	const skew = 38;
	const damp = 700;
	const initialBias = 72;
	const initialN = 0x80;

	let n = initialN;
	let i = 0;
	let bias = initialBias;
	let output = [];

	// Find delimiter
	let basicEnd = encoded.lastIndexOf('-');
	if (basicEnd < 0) {
		basicEnd = 0;
	}

	// Copy basic code points
	for (let j = 0; j < basicEnd; j++) {
		output.push(encoded.charCodeAt(j));
	}

	// Decode extended code points
	let inputPos = basicEnd > 0 ? basicEnd + 1 : 0;

	while (inputPos < encoded.length) {
		let oldi = i;
		let w = 1;

		for (let k = base; ; k += base) {
			if (inputPos >= encoded.length) {
				throw new Error("Invalid punycode input");
			}

			const digit = decodeDigit(encoded.charCodeAt(inputPos++));
			i += digit * w;

			const t = k <= bias ? tmin : (k >= bias + tmax ? tmax : k - bias);
			if (digit < t) break;

			w *= (base - t);
		}

		bias = adapt(i - oldi, output.length + 1, oldi === 0);
		n += Math.floor(i / (output.length + 1));
		i %= (output.length + 1);

		output.splice(i, 0, n);
		i++;
	}

	return String.fromCodePoint(...output);
}

function decodeDigit(cp) {
	if (cp >= 48 && cp <= 57) return cp - 22; // 0-9
	if (cp >= 65 && cp <= 90) return cp - 65; // A-Z
	if (cp >= 97 && cp <= 122) return cp - 97; // a-z
	throw new Error("Invalid digit");
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

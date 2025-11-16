/**
	{
		"api":1,
		"name":"Generate UUID v4",
		"description":"Generates a random UUID v4 (Universally Unique Identifier).",
		"author":"Boop",
		"icon":"key",
		"tags":"uuid,generate,random,guid,identifier"
	}
**/

function main(state) {
	// Generate UUID v4 (random)
	// Format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
	// where x is any hexadecimal digit and y is one of 8, 9, A, or B

	const hex = '0123456789abcdef';
	let uuid = '';

	for (let i = 0; i < 36; i++) {
		if (i === 8 || i === 13 || i === 18 || i === 23) {
			// Add hyphens at the right positions
			uuid += '-';
		} else if (i === 14) {
			// Version 4: always '4'
			uuid += '4';
		} else if (i === 19) {
			// Variant bits: 10xx (8, 9, a, or b)
			uuid += hex.charAt(8 + Math.floor(Math.random() * 4));
		} else {
			// Random hex digit
			uuid += hex.charAt(Math.floor(Math.random() * 16));
		}
	}

	state.text = uuid;
}

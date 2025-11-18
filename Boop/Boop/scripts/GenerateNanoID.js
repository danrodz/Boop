/**
	{
		"api":1,
		"name":"Generate Nano ID",
		"description":"Generates a URL-friendly unique ID (alternative to UUID, smaller)",
		"author":"Boop",
		"icon":"fingerprint",
		"tags":"nanoid,id,identifier,generate,url,slug"
	}
**/

function main(state) {
	// Nano ID alphabet (URL-safe)
	const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_-';

	const generateNanoID = (size = 21) => {
		let id = '';
		for (let i = 0; i < size; i++) {
			id += alphabet[Math.floor(Math.random() * alphabet.length)];
		}
		return id;
	};

	const id21 = generateNanoID(21); // Standard
	const id12 = generateNanoID(12); // Short
	const id8 = generateNanoID(8);   // Tiny

	const result = `Nano IDs Generated:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Standard (21): ${id21}
Short (12):    ${id12}
Tiny (8):      ${id8}

Comparison with UUID:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Size:      21 chars vs 36 chars (UUID)
Alphabet:  64 symbols vs 16 (hex)
URL-safe:  Yes (no special encoding needed)
Sortable:  No (use UUID v7 for that)

Use cases:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Short URLs
• User-facing IDs
• API keys
• Session tokens
• Filename prefixes

Collision probability (21 chars):
~1% after 10^12 IDs generated`;

	state.text = result;
}

/**
	{
		"api":1,
		"name":"Normalize Unicode",
		"description":"Normalizes Unicode text to NFC, NFD, NFKC, or NFKD form",
		"author":"Boop",
		"icon":"text",
		"tags":"unicode,normalize,nfc,nfd,text,encoding"
	}
**/

function main(state) {
	const text = state.text;

	// Normalize to all forms
	const nfc = text.normalize('NFC');   // Canonical Composition
	const nfd = text.normalize('NFD');   // Canonical Decomposition
	const nfkc = text.normalize('NFKC'); // Compatibility Composition
	const nfkd = text.normalize('NFKD'); // Compatibility Decomposition

	const result = `Original (${text.length} chars):
${text}

NFC - Canonical Composition (${nfc.length} chars):
${nfc}

NFD - Canonical Decomposition (${nfd.length} chars):
${nfd}

NFKC - Compatibility Composition (${nfkc.length} chars):
${nfkc}

NFKD - Compatibility Decomposition (${nfkd.length} chars):
${nfkd}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Normalization Forms:
• NFC:  Recommended for most use cases
• NFD:  Separates base chars from accents
• NFKC: Converts compatibility chars (e.g., ﬁ → fi)
• NFKD: NFD + compatibility conversion

Use cases:
• String comparison
• Database storage
• Search functionality
• Form validation`;

	state.text = result;
}

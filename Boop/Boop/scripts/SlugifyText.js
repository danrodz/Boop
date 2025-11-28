/**
	{
		"api":1,
		"name":"Slugify Text",
		"description":"Converts text to URL-friendly slug (lowercase, hyphens, no special chars)",
		"author":"Boop",
		"icon":"link",
		"tags":"slug,url,kebab-case,seo,permalink"
	}
**/

/*

// Alternate Implementation:
function main(state) {
  let text = String(state.text || '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s_-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
  state.text = text;
}

*/

function main(state) {
	let text = state.text.trim();

	// Convert to lowercase
	text = text.toLowerCase();

	// Replace accented characters
	const accents = {
		'à': 'a', 'á': 'a', 'â': 'a', 'ã': 'a', 'ä': 'a', 'å': 'a',
		'è': 'e', 'é': 'e', 'ê': 'e', 'ë': 'e',
		'ì': 'i', 'í': 'i', 'î': 'i', 'ï': 'i',
		'ò': 'o', 'ó': 'o', 'ô': 'o', 'õ': 'o', 'ö': 'o',
		'ù': 'u', 'ú': 'u', 'û': 'u', 'ü': 'u',
		'ñ': 'n', 'ç': 'c'
	};

	for (const [accented, plain] of Object.entries(accents)) {
		text = text.replace(new RegExp(accented, 'g'), plain);
	}

	// Replace spaces and underscores with hyphens
	text = text.replace(/[\s_]+/g, '-');

	// Remove all non-alphanumeric characters except hyphens
	text = text.replace(/[^a-z0-9-]/g, '');

	// Remove leading/trailing hyphens
	text = text.replace(/^-+|-+$/g, '');

	// Collapse multiple hyphens
	text = text.replace(/-+/g, '-');

	state.text = text;
}

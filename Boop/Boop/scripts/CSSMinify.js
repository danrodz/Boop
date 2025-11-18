/**
	{
		"api":1,
		"name":"Minify CSS",
		"description":"Minifies CSS by removing whitespace, comments, and optimizing",
		"author":"Boop",
		"icon":"compress",
		"tags":"css,minify,compress,optimize"
	}
**/

function main(state) {
	let css = state.text;

	// Remove comments
	css = css.replace(/\/\*[\s\S]*?\*\//g, '');

	// Remove whitespace around special characters
	css = css.replace(/\s*([{}:;,>+~])\s*/g, '$1');

	// Remove whitespace between property and value
	css = css.replace(/\s*:\s*/g, ':');

	// Collapse whitespace
	css = css.replace(/\s+/g, ' ');

	// Remove spaces around braces
	css = css.replace(/\s*{\s*/g, '{');
	css = css.replace(/\s*}\s*/g, '}');

	// Remove last semicolon in block
	css = css.replace(/;}/g, '}');

	// Trim
	css = css.trim();

	const originalSize = state.text.length;
	const minifiedSize = css.length;
	const savings = ((1 - minifiedSize / originalSize) * 100).toFixed(1);

	const result = `${css}

/* Minified: ${minifiedSize} bytes (saved ${savings}% from ${originalSize} bytes) */`;

	state.text = result;
}

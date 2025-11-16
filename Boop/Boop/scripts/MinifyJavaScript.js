/**
	{
		"api":1,
		"name":"Minify JavaScript",
		"description":"Minifies JavaScript code by removing comments and excess whitespace.",
		"author":"danrodz",
		"icon":"broom",
		"tags":"javascript,minify,clean,compress",
		"bias": -0.1
	}
**/

function main(input) {
	try {
		let code = input.text;

		// Remove single-line comments (but preserve URLs like http://)
		code = code.replace(/([^:])\/\/.*$/gm, '$1');

		// Remove multi-line comments
		code = code.replace(/\/\*[\s\S]*?\*\//g, '');

		// Remove extra whitespace while preserving necessary spaces
		// Replace multiple spaces with single space
		code = code.replace(/  +/g, ' ');

		// Remove whitespace around operators and punctuation
		code = code.replace(/\s*([{};,()[\]])\s*/g, '$1');

		// Remove whitespace around operators
		code = code.replace(/\s*([=+\-*/<>!&|])\s*/g, '$1');

		// Remove leading/trailing whitespace on each line
		code = code.replace(/^\s+|\s+$/gm, '');

		// Remove empty lines
		code = code.replace(/\n+/g, '\n');

		// Final trim
		code = code.trim();

		input.text = code;
	} catch (error) {
		input.postError("Error minifying JavaScript: " + error.message);
	}
}

/**
	{
		"api":1,
		"name":"Escape Regex",
		"description":"Escapes special regex characters for literal matching",
		"author":"danrodz",
		"icon":"shield",
		"tags":"regex,escape,literal,special characters"
	}
**/

function main(input) {
	try {
		const text = input.text;

		if (!text) {
			input.postError("Please enter text to escape");
			return;
		}

		// Escape special regex characters
		// Characters that need escaping: . * + ? ^ $ { } ( ) | [ ] \ /
		const escaped = text.replace(/[.*+?^${}()|[\]\\\/]/g, '\\$&');

		input.text = escaped;

	} catch(err) {
		input.postError("Error escaping regex: " + err.message);
	}
}

/**
	{
		"api":1,
		"name":"PascalCase to Sentence",
		"description":"Converts PascalCase or camelCase text to readable sentences",
		"author":"Boop",
		"icon":"text",
		"tags":"pascalcase,camelcase,sentence,convert,readable"
	}
**/

function main(state) {
	let text = state.text.trim();

	// Insert spaces before capital letters
	const sentence = text
		.replace(/([A-Z])/g, ' $1')
		.trim()
		.toLowerCase();

	// Capitalize first letter
	const result = sentence.charAt(0).toUpperCase() + sentence.slice(1);

	state.text = result;
}

/**
	{
		"api":1,
		"name":"Tabs to Spaces",
		"description":"Converts tabs to spaces (default 4 spaces per tab).",
		"author":"danrodz",
		"icon":"arrow-right",
		"tags":"tabs,spaces,indent,convert,formatting"
	}
**/

function main(input) {
	try {
		const defaultSpaces = 4;

		// Convert each tab to the specified number of spaces
		input.text = input.text.replace(/\t/g, ' '.repeat(defaultSpaces));

	} catch (error) {
		input.postError("Error converting tabs to spaces: " + error.message);
	}
}

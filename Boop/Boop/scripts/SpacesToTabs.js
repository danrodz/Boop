/**
	{
		"api":1,
		"name":"Spaces to Tabs",
		"description":"Converts leading spaces to tabs (auto-detects indent size: 2, 4, or 8 spaces).",
		"author":"danrodz",
		"icon":"arrow-left",
		"tags":"tabs,spaces,indent,convert,formatting"
	}
**/

function main(input) {
	try {
		const lines = input.text.split('\n');

		// Detect indent size by analyzing leading spaces
		let indentSize = 4; // default
		const spaceCounts = [];

		for (const line of lines) {
			const match = line.match(/^( +)/);
			if (match) {
				const count = match[1].length;
				if (count > 0) {
					spaceCounts.push(count);
				}
			}
		}

		// Find the most common small indent (GCD-like approach)
		if (spaceCounts.length > 0) {
			const minSpaces = Math.min(...spaceCounts);

			// Try to use the minimum spaces as the indent size if it's a common value
			if (minSpaces === 2 || minSpaces === 4 || minSpaces === 8) {
				indentSize = minSpaces;
			} else {
				// Check if all counts are multiples of a common indent size
				for (const size of [8, 4, 2]) {
					if (spaceCounts.every(count => count % size === 0)) {
						indentSize = size;
						break;
					}
				}
			}
		}

		// Convert leading spaces to tabs
		const result = lines.map(line => {
			const match = line.match(/^( +)/);
			if (match) {
				const spaces = match[1].length;
				const tabs = Math.floor(spaces / indentSize);
				const remainingSpaces = spaces % indentSize;
				return '\t'.repeat(tabs) + ' '.repeat(remainingSpaces) + line.slice(spaces);
			}
			return line;
		});

		input.text = result.join('\n');

	} catch (error) {
		input.postError("Error converting spaces to tabs: " + error.message);
	}
}

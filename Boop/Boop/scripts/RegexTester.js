/**
	{
		"api":1,
		"name":"Regex Tester",
		"description":"Test regex patterns against text (format: 'pattern|text' or multiline with pattern on first line)",
		"author":"danrodz",
		"icon":"beaker",
		"tags":"regex,test,pattern,match"
	}
**/

function main(input) {
	try {
		let pattern, text, flags = 'g';

		const inputText = input.text.trim();

		if (!inputText) {
			input.postError("Please enter a regex pattern and text to test");
			return;
		}

		// Check if input contains pipe separator
		if (inputText.includes('|')) {
			const parts = inputText.split('|');
			if (parts.length < 2) {
				input.postError("Invalid format. Use 'pattern|text' or multiline with pattern on first line");
				return;
			}
			pattern = parts[0].trim();
			text = parts.slice(1).join('|').trim();
		} else {
			// Multiline format: first line is pattern, rest is text
			const lines = inputText.split('\n');
			if (lines.length < 2) {
				input.postError("Invalid format. Use 'pattern|text' or multiline with pattern on first line");
				return;
			}
			pattern = lines[0].trim();
			text = lines.slice(1).join('\n').trim();
		}

		// Extract flags from pattern if present (e.g., /pattern/gi)
		const patternMatch = pattern.match(/^\/(.+)\/([gimsuvy]*)$/);
		if (patternMatch) {
			pattern = patternMatch[1];
			flags = patternMatch[2] || 'g';
		}

		// Create regex
		let regex;
		try {
			regex = new RegExp(pattern, flags);
		} catch (e) {
			input.postError("Invalid regex pattern: " + e.message);
			return;
		}

		// Find all matches
		const matches = [];
		let match;

		// Reset regex lastIndex
		regex.lastIndex = 0;

		while ((match = regex.exec(text)) !== null) {
			matches.push({
				match: match[0],
				index: match.index,
				groups: match.slice(1)
			});

			// Prevent infinite loop on zero-length matches
			if (match.index === regex.lastIndex) {
				regex.lastIndex++;
			}

			// If not global flag, break after first match
			if (!flags.includes('g')) {
				break;
			}
		}

		// Build output
		let output = `Pattern: /${pattern}/${flags}\n`;
		output += `Text: ${text}\n`;
		output += `\n`;

		if (matches.length === 0) {
			output += `No matches found.`;
		} else {
			output += `Found ${matches.length} match${matches.length !== 1 ? 'es' : ''}:\n\n`;

			matches.forEach((m, i) => {
				output += `Match ${i + 1}:\n`;
				output += `  Full match: "${m.match}"\n`;
				output += `  Position: ${m.index}\n`;

				if (m.groups.length > 0) {
					output += `  Groups:\n`;
					m.groups.forEach((g, gi) => {
						output += `    Group ${gi + 1}: "${g || ''}"\n`;
					});
				}

				output += `\n`;
			});
		}

		input.text = output;

	} catch(err) {
		input.postError("Error testing regex: " + err.message);
	}
}

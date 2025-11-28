/**
	{
		"api":1,
		"name":"Format GraphQL",
		"description":"Formats GraphQL queries and schemas with proper indentation",
		"author":"Boop",
		"icon":"broom",
		"tags":"graphql,query,format,prettify,api"
	}
**/

function main(state) {
	try {
		let text = state.text.trim();
		let indent = 0;
		let result = '';
		let inString = false;
		let stringChar = '';

		for (let i = 0; i < text.length; i++) {
			const char = text[i];
			const nextChar = text[i + 1];

			// Handle strings
			if ((char === '"' || char === "'") && text[i - 1] !== '\\') {
				if (!inString) {
					inString = true;
					stringChar = char;
				} else if (char === stringChar) {
					inString = false;
				}
				result += char;
				continue;
			}

			if (inString) {
				result += char;
				continue;
			}

			// Skip multiple spaces
			if (char === ' ' && (nextChar === ' ' || nextChar === '\n')) {
				continue;
			}

			// Opening braces
			if (char === '{' || char === '[') {
				result += char + '\n';
				indent++;
				result += '  '.repeat(indent);
				continue;
			}

			// Closing braces
			if (char === '}' || char === ']') {
				indent--;
				result = result.trimEnd();
				result += '\n' + '  '.repeat(indent) + char;
				if (nextChar && nextChar !== ',' && nextChar !== '}' && nextChar !== ']') {
					result += '\n' + '  '.repeat(indent);
				}
				continue;
			}

			// Commas
			if (char === ',') {
				result += char + '\n' + '  '.repeat(indent);
				continue;
			}

			// Parentheses (for arguments)
			if (char === '(') {
				result += char;
				continue;
			}

			if (char === ')') {
				result += char;
				if (nextChar === '{') {
					result += ' ';
				}
				continue;
			}

			// Skip newlines in source
			if (char === '\n') {
				continue;
			}

			result += char;
		}

		state.text = result.trim();
	}
	catch(error) {
		state.postError("Error formatting GraphQL: " + error.message);
	}
}

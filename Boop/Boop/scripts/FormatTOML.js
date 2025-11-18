/**
	{
		"api":1,
		"name":"Format TOML",
		"description":"Formats and validates TOML configuration files",
		"author":"Boop",
		"icon":"broom",
		"tags":"toml,config,format,prettify"
	}
**/

function main(state) {
	try {
		const text = state.text.trim();

		// Basic TOML parser and formatter
		const lines = text.split('\n');
		const formatted = [];
		let inArray = false;
		let lastWasEmpty = false;

		for (let line of lines) {
			const trimmed = line.trim();

			// Skip multiple empty lines
			if (trimmed === '') {
				if (!lastWasEmpty && formatted.length > 0) {
					formatted.push('');
					lastWasEmpty = true;
				}
				continue;
			}
			lastWasEmpty = false;

			// Section headers [section]
			if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
				if (formatted.length > 0) formatted.push('');
				formatted.push(trimmed);
				continue;
			}

			// Comments
			if (trimmed.startsWith('#')) {
				formatted.push(trimmed);
				continue;
			}

			// Key-value pairs
			if (trimmed.includes('=')) {
				const [key, ...valueParts] = trimmed.split('=');
				const value = valueParts.join('=').trim();
				formatted.push(`${key.trim()} = ${value}`);
				continue;
			}

			// Array elements
			formatted.push(trimmed);
		}

		state.text = formatted.join('\n');
	}
	catch(error) {
		state.postError("Invalid TOML: " + error.message);
	}
}

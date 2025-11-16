/**
	{
		"api":1,
		"name":"Pretty Print Query String",
		"description":"Formats URL query strings into readable format",
		"author":"danrodz",
		"icon":"link",
		"tags":"url,query,format,pretty,decode"
	}
**/

function main(input) {
	try {
		let queryString = input.text.trim();

		if (!queryString) {
			input.postError("Please enter a query string");
			return;
		}

		// Remove leading '?' if present
		if (queryString.startsWith('?')) {
			queryString = queryString.substring(1);
		}

		// Handle full URL
		if (queryString.startsWith('http://') || queryString.startsWith('https://')) {
			const urlMatch = queryString.match(/\?(.+)$/);
			if (!urlMatch) {
				input.postError("No query string found in URL");
				return;
			}
			queryString = urlMatch[1];
		}

		// Split by & or ;
		const params = queryString.split(/[&;]/);

		if (params.length === 0 || (params.length === 1 && params[0] === '')) {
			input.postError("No parameters found in query string");
			return;
		}

		// Parse and decode parameters
		const parsed = [];
		let maxKeyLength = 0;

		for (const param of params) {
			if (!param) continue;

			const eqIndex = param.indexOf('=');
			let key, value;

			if (eqIndex === -1) {
				// Parameter without value
				key = decodeURIComponent(param);
				value = '';
			} else {
				key = decodeURIComponent(param.substring(0, eqIndex));
				value = decodeURIComponent(param.substring(eqIndex + 1));
			}

			parsed.push({ key, value });
			maxKeyLength = Math.max(maxKeyLength, key.length);
		}

		// Format output
		let output = 'Query String Parameters:\n';
		output += '='.repeat(50) + '\n\n';

		parsed.forEach((param, index) => {
			const paddedKey = param.key.padEnd(maxKeyLength);
			output += `${paddedKey} : ${param.value}\n`;
		});

		output += '\n' + '='.repeat(50) + '\n';
		output += `Total: ${parsed.length} parameter${parsed.length !== 1 ? 's' : ''}`;

		input.text = output;

	} catch(err) {
		input.postError("Error parsing query string: " + err.message);
	}
}

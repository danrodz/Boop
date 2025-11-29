/**
	{
		"api":1,
		"name":"cURL to Fetch",
		"description":"Converts cURL commands to JavaScript fetch() code",
		"author":"Boop",
		"icon":"code",
		"tags":"curl,fetch,javascript,api,http,convert"
	}
**/

function main(state) {
	try {
		let curl = state.text.trim();

		// Remove 'curl' command and line continuations
		curl = curl.replace(/^curl\s+/, '').replace(/\\\s*\n\s*/g, ' ');

		// Extract URL
		const urlMatch = curl.match(/['"]([^'"]+)['"]|(\S+)/);
		const url = urlMatch ? (urlMatch[1] || urlMatch[2]) : '';

		// Extract method
		const methodMatch = curl.match(/-X\s+(\w+)/);
		const method = methodMatch ? methodMatch[1] : 'GET';

		// Extract headers
		const headers = {};
		const headerRegex = /-H\s+['"]([^:]+):\s*([^'"]+)['"]/g;
		let match;
		while ((match = headerRegex.exec(curl)) !== null) {
			headers[match[1]] = match[2];
		}

		// Extract body data
		const dataMatch = curl.match(/--data(?:-raw|-binary)?\s+['"](.+?)['"]/s);
		const body = dataMatch ? dataMatch[1] : null;

		// Generate fetch code
		let code = `fetch('${url}', {\n`;
		code += `  method: '${method}'`;

		if (Object.keys(headers).length > 0) {
			code += ',\n  headers: {\n';
			for (const [key, value] of Object.entries(headers)) {
				code += `    '${key}': '${value}',\n`;
			}
			code = code.slice(0, -2) + '\n  }';
		}

		if (body) {
			code += ',\n  body: ';
			try {
				JSON.parse(body);
				code += `JSON.stringify(${body})`;
			} catch {
				code += `'${body.replace(/'/g, "\\'")}'`;
			}
		}

		code += '\n})';
		code += '\n  .then(response => response.json())';
		code += '\n  .then(data => console.log(data))';
		code += '\n  .catch(error => console.error(error));';

		state.text = code;
	}
	catch(error) {
		state.postError("Error parsing cURL: " + error.message);
	}
}

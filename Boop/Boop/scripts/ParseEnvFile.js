/**
	{
		"api":1,
		"name":"Parse .env File",
		"description":"Converts .env file to JSON object or exports for various languages",
		"author":"Boop",
		"icon":"code",
		"tags":"env,environment,config,parse,convert"
	}
**/

function main(state) {
	const lines = state.text.split('\n');
	const vars = {};

	for (let line of lines) {
		line = line.trim();

		// Skip comments and empty lines
		if (line.startsWith('#') || line === '') continue;

		// Parse KEY=value or KEY="value" or KEY='value'
		const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
		if (match) {
			const [, key, value] = match;
			// Remove quotes if present
			const cleanValue = value.replace(/^["']|["']$/g, '');
			vars[key] = cleanValue;
		}
	}

	if (Object.keys(vars).length === 0) {
		state.postError("No environment variables found");
		return;
	}

	// Generate output in multiple formats
	const json = JSON.stringify(vars, null, 2);

	const jsExport = Object.entries(vars)
		.map(([k, v]) => `export const ${k} = ${JSON.stringify(v)};`)
		.join('\n');

	const pythonDict = 'env = {\n' +
		Object.entries(vars)
			.map(([k, v]) => `    "${k}": ${JSON.stringify(v)},`)
			.join('\n') + '\n}';

	const result = `JSON Format:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${json}

JavaScript/TypeScript:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${jsExport}

Python Dictionary:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${pythonDict}

Found ${Object.keys(vars).length} environment variable(s)`;

	state.text = result;
}

/**
	{
		"api":1,
		"name":"Extract JSON",
		"description":"Extracts and formats JSON from text (logs, code, markdown, etc)",
		"author":"Boop",
		"icon":"extract",
		"tags":"json,extract,parse,find"
	}
**/

function main(state) {
	const text = state.text;

	// Find all JSON objects and arrays
	const jsonPattern = /(\{(?:[^{}]|(?:\{[^{}]*\}))*\}|\[(?:[^\[\]]|(?:\[[^\[\]]*\]))*\])/g;
	const matches = [];
	let match;

	while ((match = jsonPattern.exec(text)) !== null) {
		try {
			const parsed = JSON.parse(match[0]);
			matches.push(JSON.stringify(parsed, null, 2));
		} catch {
			// Not valid JSON, skip
		}
	}

	if (matches.length === 0) {
		state.postError("No valid JSON found in text");
		return;
	}

	const result = matches.length === 1
		? matches[0]
		: matches.map((m, i) => `// JSON Object ${i + 1}\n${m}`).join('\n\n');

	state.text = result;
}

/**
	{
		"api":1,
		"name":"Prettify JSONL",
		"description":"Formats each JSONL entry with indentation for readability",
		"author":"Boop",
		"icon":"broom",
		"tags":"jsonl,ndjson,prettify,format,json"
	}
**/

function main(state) {
	try {
		const lines = state.text.split('\n').filter(line => line.trim());
		const formatted = [];

		for (let i = 0; i < lines.length; i++) {
			const parsed = JSON.parse(lines[i]);
			formatted.push(`// Entry ${i + 1}`);
			formatted.push(JSON.stringify(parsed, null, 2));
			if (i < lines.length - 1) formatted.push('');
		}

		state.text = formatted.join('\n');
	}
	catch(error) {
		state.postError("Invalid JSONL: " + error.message);
	}
}

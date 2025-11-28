/**
	{
		"api":1,
		"name":"Format JSONL",
		"description":"Formats JSON Lines (newline-delimited JSON) - each line is a valid JSON object",
		"author":"Boop",
		"icon":"broom",
		"tags":"jsonl,ndjson,format,json"
	}
**/

function main(state) {
	try {
		const lines = state.text.split('\n').filter(line => line.trim());
		const formatted = [];

		for (let line of lines) {
			const parsed = JSON.parse(line);
			formatted.push(JSON.stringify(parsed));
		}

		state.text = formatted.join('\n');
	}
	catch(error) {
		state.postError("Invalid JSONL: " + error.message);
	}
}

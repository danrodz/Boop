/**
	{
		"api":1,
		"name":"Count AI Tokens",
		"description":"Estimates token count for GPT-4, Claude, and other AI models",
		"author":"Boop",
		"icon":"number",
		"tags":"ai,tokens,gpt,claude,llm,openai,anthropic"
	}
**/

function main(state) {
	const text = state.text;

	// Simple tokenization estimation
	// GPT-4 uses ~4 chars per token on average
	// Claude uses similar tokenization
	const gpt4Estimate = Math.ceil(text.length / 4);

	// More accurate: count words, punctuation, special chars
	const words = text.match(/\w+/g) || [];
	const punctuation = text.match(/[^\w\s]/g) || [];
	const betterEstimate = words.length + Math.ceil(punctuation.length / 2);

	// Character counts
	const chars = text.length;
	const charsNoSpaces = text.replace(/\s/g, '').length;
	const lines = text.split('\n').length;

	const result = `Token Estimates:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GPT-4/Claude (conservative): ~${gpt4Estimate} tokens
GPT-4/Claude (word-based):   ~${betterEstimate} tokens

Character Analysis:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total characters: ${chars.toLocaleString()}
Without spaces:   ${charsNoSpaces.toLocaleString()}
Words:            ${words.length.toLocaleString()}
Lines:            ${lines.toLocaleString()}

Cost Estimates (as of 2025):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GPT-4 Turbo:  $${(gpt4Estimate * 0.00001).toFixed(4)} (input)
Claude Sonnet: $${(betterEstimate * 0.000003).toFixed(4)} (input)

Note: Estimates only. Actual tokens may vary.`;

	state.text = result;
}

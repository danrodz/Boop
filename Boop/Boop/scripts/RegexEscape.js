/**
	{
		"api":1,
		"name":"Escape Regex",
		"description":"Escapes special characters for use in regular expressions",
		"author":"Boop",
		"icon":"shield",
		"tags":"regex,escape,regexp,sanitize"
	}
**/

function main(state) {
	const text = state.text;

	// Escape special regex characters
	const escaped = text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

	const result = `Original:
${text}

Escaped for Regex:
${escaped}

Usage Examples:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
JavaScript:
const pattern = new RegExp(${JSON.stringify(escaped)}, 'g');
const matches = str.match(pattern);

Python:
import re
pattern = re.compile(r'${escaped}')
matches = pattern.findall(text)

Special chars escaped:
. * + ? ^ $ { } ( ) | [ ] \\`;

	state.text = result;
}

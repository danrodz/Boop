/**
	{
		"api":1,
		"name":"Generate Git Branch Name",
		"description":"Converts text to a clean git branch name following best practices",
		"author":"Boop",
		"icon":"git",
		"tags":"git,branch,slug,kebab-case"
	}
**/

function main(state) {
	let text = state.text.trim();

	// Convert to lowercase
	text = text.toLowerCase();

	// Replace spaces and special chars with hyphens
	text = text.replace(/[^\w\s/-]/g, '');
	text = text.replace(/[\s_/]+/g, '-');

	// Remove leading/trailing hyphens
	text = text.replace(/^-+|-+$/g, '');

	// Collapse multiple hyphens
	text = text.replace(/-+/g, '-');

	// Limit length (recommended max 50 chars)
	if (text.length > 50) {
		text = text.substring(0, 50).replace(/-+$/, '');
	}

	// Suggest patterns
	const patterns = [
		`feature/${text}`,
		`fix/${text}`,
		`hotfix/${text}`,
		`release/${text}`,
		`refactor/${text}`,
		`chore/${text}`,
		text
	];

	const result = `Git Branch Names:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${patterns.join('\n')}

Best Practices:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ Use lowercase
✓ Use hyphens, not spaces
✓ Keep it short (< 50 chars)
✓ Use prefixes (feature/, fix/, etc)
✗ Avoid special characters
✗ Don't end with hyphen`;

	state.text = result;
}

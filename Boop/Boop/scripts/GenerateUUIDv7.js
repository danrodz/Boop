/**
	{
		"api":1,
		"name":"Generate UUID v7",
		"description":"Generates a time-ordered UUID v7 (newest UUID standard with timestamp)",
		"author":"Boop",
		"icon":"fingerprint",
		"tags":"uuid,v7,guid,identifier,generate,timestamp"
	}
**/

function main(state) {
	// UUID v7 implementation (timestamp-based)
	const timestamp = Date.now();

	// 48-bit timestamp in milliseconds
	const timestampHex = timestamp.toString(16).padStart(12, '0');

	// Random data for the rest
	const randomHex = () => Math.floor(Math.random() * 16).toString(16);
	const randomBytes = () => Array.from({length: 2}, randomHex).join('');

	// UUID v7 format: xxxxxxxx-xxxx-7xxx-yxxx-xxxxxxxxxxxx
	// where first 48 bits are timestamp
	const uuid = [
		timestampHex.slice(0, 8),
		timestampHex.slice(8, 12),
		'7' + Array.from({length: 3}, randomHex).join(''),
		(8 + Math.floor(Math.random() * 4)).toString(16) + Array.from({length: 3}, randomHex).join(''),
		Array.from({length: 12}, randomHex).join('')
	].join('-');

	const result = `UUID v7 (Time-Ordered):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${uuid}

Features:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ Time-ordered (sortable)
✓ Contains timestamp: ${new Date(timestamp).toISOString()}
✓ Database-friendly (indexed efficiently)
✓ Compatible with UUID v4 systems

Use cases:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Database primary keys
• Distributed systems
• Event sourcing
• Audit logs`;

	state.text = result;
}

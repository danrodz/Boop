/**
	{
		"api":1,
		"name":"Unix Timestamp Converter",
		"description":"Converts between Unix timestamps and human-readable dates (bidirectional)",
		"author":"Boop",
		"icon":"clock",
		"tags":"unix,timestamp,date,time,epoch,convert"
	}
**/

function main(state) {
	const text = state.text.trim();

	// Check if input is a timestamp (number)
	if (/^\d+$/.test(text)) {
		const timestamp = parseInt(text);

		// Detect if milliseconds or seconds
		const isMilliseconds = timestamp > 10000000000;
		const ms = isMilliseconds ? timestamp : timestamp * 1000;

		const date = new Date(ms);

		if (isNaN(date.getTime())) {
			state.postError("Invalid timestamp");
			return;
		}

		const result = `Unix Timestamp: ${timestamp}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ISO 8601:     ${date.toISOString()}
Local:        ${date.toLocaleString()}
UTC:          ${date.toUTCString()}
Relative:     ${getRelativeTime(date)}

Timestamp Info:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Format:       ${isMilliseconds ? 'Milliseconds' : 'Seconds'}
Year:         ${date.getFullYear()}
Month:        ${date.getMonth() + 1}
Day:          ${date.getDate()}
Hour:         ${date.getHours()}
Minute:       ${date.getMinutes()}
Second:       ${date.getSeconds()}`;

		state.text = result;
	}
	// Check if input is a date string
	else {
		const date = new Date(text);

		if (isNaN(date.getTime())) {
			state.postError("Invalid date format. Try: 2025-01-15 or Jan 15, 2025");
			return;
		}

		const seconds = Math.floor(date.getTime() / 1000);
		const milliseconds = date.getTime();

		const result = `Date: ${date.toISOString()}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Unix (seconds):       ${seconds}
Unix (milliseconds):  ${milliseconds}
Local:                ${date.toLocaleString()}
UTC:                  ${date.toUTCString()}
Relative:             ${getRelativeTime(date)}

Current Time:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Now (seconds):        ${Math.floor(Date.now() / 1000)}
Now (milliseconds):   ${Date.now()}`;

		state.text = result;
	}
}

function getRelativeTime(date) {
	const now = new Date();
	const diff = now - date;
	const absDiff = Math.abs(diff);

	const seconds = Math.floor(absDiff / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);

	const future = diff < 0;
	const prefix = future ? 'in ' : '';
	const suffix = future ? '' : ' ago';

	if (seconds < 60) return prefix + seconds + ' seconds' + suffix;
	if (minutes < 60) return prefix + minutes + ' minutes' + suffix;
	if (hours < 24) return prefix + hours + ' hours' + suffix;
	return prefix + days + ' days' + suffix;
}

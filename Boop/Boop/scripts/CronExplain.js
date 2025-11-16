/**
	{
		"api":1,
		"name":"Cron Explain",
		"description":"Explains cron expressions in plain English",
		"author":"Boop",
		"icon":"clock",
		"tags":"cron,explain,time,schedule"
	}
**/

function main(input) {
	try {
		const cronExpr = input.text.trim();

		if (!cronExpr) {
			input.postError("Please enter a cron expression");
			return;
		}

		const parts = cronExpr.split(/\s+/);

		if (parts.length !== 5) {
			input.postError("Invalid cron expression. Expected 5 fields: minute hour day month weekday");
			return;
		}

		const [minute, hour, day, month, weekday] = parts;

		let explanation = "This cron expression runs:\n";

		// Parse minute
		const minutePart = parseCronField(minute, 'minute', 0, 59);

		// Parse hour
		const hourPart = parseCronField(hour, 'hour', 0, 23);

		// Parse day of month
		const dayPart = parseCronField(day, 'day of the month', 1, 31);

		// Parse month
		const monthPart = parseCronField(month, 'month', 1, 12, {
			'1': 'January', '2': 'February', '3': 'March', '4': 'April',
			'5': 'May', '6': 'June', '7': 'July', '8': 'August',
			'9': 'September', '10': 'October', '11': 'November', '12': 'December'
		});

		// Parse weekday
		const weekdayPart = parseCronField(weekday, 'day of the week', 0, 6, {
			'0': 'Sunday', '1': 'Monday', '2': 'Tuesday', '3': 'Wednesday',
			'4': 'Thursday', '5': 'Friday', '6': 'Saturday', '7': 'Sunday'
		});

		// Build human-readable explanation
		const parts_list = [];

		if (minutePart !== '*' && hourPart !== '*') {
			parts_list.push(hourPart + ' ' + minutePart);
		} else if (minutePart !== '*') {
			parts_list.push(minutePart);
		} else if (hourPart !== '*') {
			parts_list.push(hourPart);
		} else {
			parts_list.push("every minute");
		}

		if (dayPart !== '*') {
			parts_list.push(dayPart);
		}

		if (monthPart !== '*') {
			parts_list.push(monthPart);
		}

		if (weekdayPart !== '*') {
			parts_list.push(weekdayPart);
		}

		explanation += parts_list.join(', ');

		input.text = explanation;

	} catch(err) {
		input.postError("Error parsing cron expression: " + err.message);
	}
}

function parseCronField(field, fieldName, min, max, names = null) {
	// Handle asterisk (any value)
	if (field === '*') {
		return '*';
	}

	// Handle step values (*/n)
	if (field.startsWith('*/')) {
		const step = field.substring(2);
		if (fieldName === 'minute' || fieldName === 'hour') {
			return `every ${step} ${fieldName}${step !== '1' ? 's' : ''}`;
		}
		return `every ${step} ${fieldName}${step !== '1' ? 's' : ''}`;
	}

	// Handle ranges (n-m)
	if (field.includes('-')) {
		const [start, end] = field.split('-');
		const startName = names && names[start] ? names[start] : start;
		const endName = names && names[end] ? names[end] : end;
		return `${fieldName} ${startName} through ${endName}`;
	}

	// Handle lists (n,m,o)
	if (field.includes(',')) {
		const values = field.split(',');
		const valueNames = values.map(v => names && names[v] ? names[v] : v);
		if (valueNames.length === 2) {
			return `${fieldName} ${valueNames[0]} and ${valueNames[1]}`;
		}
		return `${fieldName} ${valueNames.slice(0, -1).join(', ')}, and ${valueNames[valueNames.length - 1]}`;
	}

	// Handle step in range (n-m/s)
	if (field.includes('/') && field.includes('-')) {
		const [range, step] = field.split('/');
		const [start, end] = range.split('-');
		return `every ${step} ${fieldName}s from ${start} through ${end}`;
	}

	// Handle specific value
	const valueName = names && names[field] ? names[field] : field;
	return `at ${fieldName} ${valueName}`;
}

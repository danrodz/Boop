/**
	{
		"api":1,
		"name":"Format Markdown Table",
		"description":"Formats and aligns markdown tables for better readability",
		"author":"Boop",
		"icon":"table",
		"tags":"markdown,table,format,align"
	}
**/

function main(state) {
	try {
		const lines = state.text.trim().split('\n');

		// Parse table rows
		const rows = lines.map(line => {
			return line.split('|')
				.map(cell => cell.trim())
				.filter((cell, i, arr) => i !== 0 && i !== arr.length - 1 || cell !== '');
		});

		if (rows.length < 2) {
			state.postError("Need at least header and separator rows");
			return;
		}

		// Calculate max width for each column
		const colCount = Math.max(...rows.map(row => row.length));
		const colWidths = Array(colCount).fill(0);

		rows.forEach((row, i) => {
			// Skip separator row for width calculation
			if (i === 1 && row[0].match(/^:?-+:?$/)) return;

			row.forEach((cell, j) => {
				colWidths[j] = Math.max(colWidths[j], cell.length);
			});
		});

		// Format rows
		const formatted = rows.map((row, i) => {
			const cells = row.map((cell, j) => {
				// Check if this is the separator row
				if (i === 1 && cell.match(/^:?-+:?$/)) {
					const leftAlign = cell.startsWith(':');
					const rightAlign = cell.endsWith(':');
					const width = colWidths[j];

					if (leftAlign && rightAlign) {
						return ':' + '-'.repeat(width - 2) + ':';
					} else if (leftAlign) {
						return ':' + '-'.repeat(width - 1);
					} else if (rightAlign) {
						return '-'.repeat(width - 1) + ':';
					} else {
						return '-'.repeat(width);
					}
				}
				return cell.padEnd(colWidths[j]);
			});
			return '| ' + cells.join(' | ') + ' |';
		});

		state.text = formatted.join('\n');
	}
	catch(error) {
		state.postError("Error formatting table: " + error.message);
	}
}

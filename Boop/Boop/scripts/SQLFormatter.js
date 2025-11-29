/**
	{
		"api":1,
		"name":"Format SQL",
		"description":"Formats SQL queries with proper indentation and keyword capitalization",
		"author":"Boop",
		"icon":"broom",
		"tags":"sql,format,query,database,prettify"
	}
**/

function main(state) {
	let sql = state.text.trim();

	// SQL keywords to capitalize
	const keywords = [
		'SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'NOT', 'IN', 'LIKE', 'BETWEEN',
		'INSERT', 'INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE',
		'JOIN', 'LEFT', 'RIGHT', 'INNER', 'OUTER', 'CROSS', 'ON',
		'GROUP', 'BY', 'HAVING', 'ORDER', 'ASC', 'DESC',
		'LIMIT', 'OFFSET', 'AS', 'DISTINCT', 'ALL',
		'UNION', 'INTERSECT', 'EXCEPT',
		'CREATE', 'TABLE', 'ALTER', 'DROP', 'INDEX',
		'PRIMARY', 'KEY', 'FOREIGN', 'REFERENCES',
		'NULL', 'DEFAULT', 'AUTO_INCREMENT',
		'CASE', 'WHEN', 'THEN', 'ELSE', 'END'
	];

	// Capitalize keywords
	keywords.forEach(keyword => {
		const regex = new RegExp('\\b' + keyword + '\\b', 'gi');
		sql = sql.replace(regex, keyword);
	});

	// Add newlines before major keywords
	const majorKeywords = ['SELECT', 'FROM', 'WHERE', 'GROUP BY', 'HAVING', 'ORDER BY', 'LIMIT', 'JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN'];
	majorKeywords.forEach(keyword => {
		sql = sql.replace(new RegExp('\\s+' + keyword + '\\s+', 'gi'), '\n' + keyword + ' ');
	});

	// Indent AND/OR
	sql = sql.replace(/\n(AND|OR)\s+/g, '\n  $1 ');

	// Clean up extra whitespace
	sql = sql.replace(/\s+/g, ' ');
	sql = sql.replace(/\s*,\s*/g, ', ');
	sql = sql.replace(/\(\s+/g, '(');
	sql = sql.replace(/\s+\)/g, ')');

	// Final cleanup
	sql = sql.trim().split('\n').map(line => line.trim()).join('\n');

	state.text = sql;
}

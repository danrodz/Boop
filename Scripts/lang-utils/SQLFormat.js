/**
  {
    "api": 1,
    "name": "SQL Format (Basic)",
    "description": "Basic SQL formatting",
    "author": "Boop",
    "icon": "curlybraces",
    "tags": "code,programming,javascript,python,format"
  }
**/

function main(state) {
  let sql = state.text;
  sql = sql.replace(/\b(SELECT|FROM|WHERE|AND|OR|ORDER BY|GROUP BY|HAVING|JOIN|LEFT JOIN|RIGHT JOIN|INNER JOIN)\b/gi, '\n$1');
  sql = sql.replace(/,/g, ',\n  ');
  state.text = sql.trim();
}

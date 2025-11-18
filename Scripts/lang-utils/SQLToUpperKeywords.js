/**
  {
    "api": 1,
    "name": "SQL Keywords to Upper",
    "description": "Converts SQL keywords to uppercase",
    "author": "Boop",
    "icon": "curlybraces",
    "tags": "programming,code,language,format,escape"
  }
**/

function main(state) {
  const keywords = ['SELECT', 'FROM', 'WHERE', 'INSERT', 'UPDATE', 'DELETE', 'JOIN', 'ON', 'AND', 'OR', 'ORDER BY', 'GROUP BY'];
  let sql = state.text;
  keywords.forEach(kw => {
    const regex = new RegExp(\`\\b\${kw}\\b\`, 'gi');
    sql = sql.replace(regex, kw);
  });
  state.text = sql;
}

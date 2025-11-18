/**
  {
    "api": 1,
    "name": "SQL to Elasticsearch Query",
    "description": "Convert simple SQL to Elasticsearch Query DSL",
    "author": "Boop",
    "icon": "magnifyingglass.circle",
    "tags": "sql,elasticsearch,query,convert"
  }
**/

function main(state) {
  try {
    const sql = state.text.trim().toUpperCase();

    const fromMatch = sql.match(/FROM\s+(\w+)/i);
    const whereMatch = sql.match(/WHERE\s+(.+?)(?:ORDER|LIMIT|$)/i);
    const limitMatch = sql.match(/LIMIT\s+(\d+)/i);

    if (!fromMatch) {
      state.postError("Could not parse SQL query");
      return;
    }

    const index = fromMatch[1].toLowerCase();
    const query = { bool: { must: [] } };

    if (whereMatch) {
      const conditions = whereMatch[1].trim();

      // Simple equality: field = 'value'
      const eqMatches = conditions.matchAll(/(\w+)\s*=\s*'([^']+)'/gi);
      for (let match of eqMatches) {
        query.bool.must.push({
          match: { [match[1].toLowerCase()]: match[2] }
        });
      }

      // LIKE: field LIKE '%value%'
      const likeMatches = conditions.matchAll(/(\w+)\s+LIKE\s+'%([^%]+)%'/gi);
      for (let match of likeMatches) {
        query.bool.must.push({
          wildcard: { [match[1].toLowerCase()]: `*${match[2]}*` }
        });
      }
    }

    const result = {
      index: index,
      body: {
        query: query.bool.must.length > 0 ? query : { match_all: {} },
        size: limitMatch ? parseInt(limitMatch[1]) : 10
      }
    };

    state.text = JSON.stringify(result, null, 2);
  } catch (error) {
    state.postError("Failed to convert: " + error.message);
  }
}

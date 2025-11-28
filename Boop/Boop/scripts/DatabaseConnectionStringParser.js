/**
  {
    "api": 1,
    "name": "Database Connection String Parser",
    "description": "Parse and format database connection strings",
    "author": "Boop",
    "icon": "link.circle",
    "tags": "database,connection,string,parse,url"
  }
**/

function main(state) {
  try {
    const connStr = state.text.trim();

    // Parse different connection string formats
    let result = ['Connection String Analysis:', ''];

    // PostgreSQL format: postgresql://user:password@host:port/database
    const pgMatch = connStr.match(/^postgres(?:ql)?:\/\/(?:([^:]+):([^@]+)@)?([^:\/]+)(?::(\d+))?\/(.+?)(?:\?(.+))?$/);

    // MySQL format: mysql://user:password@host:port/database
    const mysqlMatch = connStr.match(/^mysql:\/\/(?:([^:]+):([^@]+)@)?([^:\/]+)(?::(\d+))?\/(.+?)(?:\?(.+))?$/);

    // MongoDB format: mongodb://user:password@host:port/database
    const mongoMatch = connStr.match(/^mongodb(?:\+srv)?:\/\/(?:([^:]+):([^@]+)@)?([^:\/]+)(?::(\d+))?\/(.+?)(?:\?(.+))?$/);

    const match = pgMatch || mysqlMatch || mongoMatch;

    if (match) {
      const [, user, password, host, port, database, params] = match;

      const dbType = pgMatch ? 'PostgreSQL' : mysqlMatch ? 'MySQL' : 'MongoDB';
      const defaultPort = pgMatch ? '5432' : mysqlMatch ? '3306' : '27017';

      result.push(`Type: ${dbType}`);
      result.push(`Host: ${host}`);
      result.push(`Port: ${port || defaultPort}`);
      result.push(`Database: ${database}`);
      result.push(`Username: ${user || 'not specified'}`);
      result.push(`Password: ${password ? '****** (hidden)' : 'not specified'}`);

      if (params) {
        result.push('');
        result.push('Parameters:');
        params.split('&').forEach(p => {
          const [key, value] = p.split('=');
          result.push(`  ${key}: ${value}`);
        });
      }

      result.push('');
      result.push('Security Notes:');
      if (password) {
        result.push('⚠️  Password in connection string - use environment variables');
      }
      if (!connStr.includes('ssl=')) {
        result.push('⚠️  SSL not explicitly enabled');
      }
    } else {
      // Try key-value format: host=localhost;port=5432;database=mydb
      const kvPairs = connStr.split(';');
      const parsed = {};

      for (const pair of kvPairs) {
        const [key, value] = pair.split('=').map(s => s.trim());
        if (key && value) {
          parsed[key.toLowerCase()] = value;
        }
      }

      if (Object.keys(parsed).length > 0) {
        result.push('Format: Key-Value pairs');
        result.push('');
        for (const [key, value] of Object.entries(parsed)) {
          if (key.includes('password') || key.includes('pwd')) {
            result.push(`${key}: ****** (hidden)`);
          } else {
            result.push(`${key}: ${value}`);
          }
        }
      } else {
        state.postError("Could not parse connection string format");
        return;
      }
    }

    state.text = result.join('\n');
  } catch (error) {
    state.postError("Error parsing connection string: " + error.message);
  }
}

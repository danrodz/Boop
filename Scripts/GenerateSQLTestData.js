/**
  {
    "api": 1,
    "name": "Generate SQL Test Data",
    "description": "Generate INSERT statements with test data",
    "author": "Boop",
    "icon": "cylinder.fill",
    "tags": "sql,test,data,generate,insert"
  }
**/

function main(state) {
  try {
    const input = state.text.trim();
    const count = parseInt(input) || 10;
    const tableName = 'users';

    const firstNames = ['John', 'Jane', 'Bob', 'Alice', 'Charlie', 'Diana', 'Eve', 'Frank'];
    const lastNames = ['Smith', 'Doe', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller'];
    const domains = ['example.com', 'test.com', 'demo.com'];

    function random(arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    }

    let sql = `-- Generated Test Data (${count} rows)\n\n`;

    for (let i = 1; i <= count; i++) {
      const firstName = random(firstNames);
      const lastName = random(lastNames);
      const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@${random(domains)}`;
      const age = Math.floor(Math.random() * 50) + 18;
      const isActive = Math.random() > 0.3 ? 'true' : 'false';

      sql += `INSERT INTO ${tableName} (name, email, age, is_active) `;
      sql += `VALUES ('${firstName} ${lastName}', '${email}', ${age}, ${isActive});\n`;
    }

    state.text = sql;
  } catch (error) {
    state.postError("Failed to generate test data: " + error.message);
  }
}

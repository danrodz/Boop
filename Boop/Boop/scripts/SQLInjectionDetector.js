/**
  {
    "api": 1,
    "name": "SQL Injection Detector",
    "description": "Detect potential SQL injection vulnerabilities in queries",
    "author": "Boop",
    "icon": "exclamationmark.shield",
    "tags": "sql,injection,security,vulnerability,scan"
  }
**/

function main(state) {
  try {
    const code = state.text;
    const issues = [];
    let lineNum = 0;

    const dangerousPatterns = [
      { pattern: /['"]?\s*\+\s*['"]?/g, desc: 'String concatenation in SQL query' },
      { pattern: /\$\{[^}]+\}/g, desc: 'Template literal variable injection' },
      { pattern: /\"\s*\+\s*\w+\s*\+\s*\"/g, desc: 'Direct variable concatenation' },
      { pattern: /query\s*=\s*['"].*?['"].*?['"]\s*\+/gi, desc: 'Query string concatenation' },
      { pattern: /execute\([^?]*\)/gi, desc: 'SQL execution without parameterization' },
      { pattern: /eval\(/gi, desc: 'Use of eval() with SQL' }
    ];

    const lines = code.split('\n');

    for (const line of lines) {
      lineNum++;

      for (const { pattern, desc } of dangerousPatterns) {
        if (pattern.test(line)) {
          issues.push({
            line: lineNum,
            issue: desc,
            code: line.trim()
          });
        }
      }
    }

    const result = ['SQL Injection Security Scan:', ''];

    if (issues.length === 0) {
      result.push('✓ No obvious SQL injection vulnerabilities detected');
      result.push('');
      result.push('Best Practices:');
      result.push('- Use parameterized queries');
      result.push('- Use prepared statements');
      result.push('- Validate and sanitize all user input');
      result.push('- Use ORM/query builders when possible');
    } else {
      result.push(`⚠️  Found ${issues.length} potential vulnerability(ies):`);
      result.push('');

      issues.forEach((issue, i) => {
        result.push(`${i + 1}. Line ${issue.line}: ${issue.issue}`);
        result.push(`   ${issue.code}`);
        result.push('');
      });

      result.push('Recommendations:');
      result.push('- Use parameterized queries: db.query("SELECT * FROM users WHERE id = ?", [userId])');
      result.push('- Use prepared statements');
      result.push('- Never concatenate user input into SQL');
      result.push('- Use ORMs like Sequelize, TypeORM, Prisma');
    }

    state.text = result.join('\n');
  } catch (error) {
    state.postError("Error scanning for SQL injection: " + error.message);
  }
}

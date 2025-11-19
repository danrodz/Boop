/**
  {
    "api": 1,
    "name": "API Documentation Generator",
    "description": "Generate API documentation from endpoint list",
    "author": "Boop",
    "icon": "doc.richtext",
    "tags": "api,documentation,rest,endpoints"
  }
**/

function main(state) {
  try {
    const lines = state.text.split('\n').filter(l => l.trim());
    const endpoints = [];

    // Parse endpoint definitions
    // Format: METHOD /path - Description
    for (let line of lines) {
      const match = line.match(/^(GET|POST|PUT|PATCH|DELETE|OPTIONS|HEAD)\s+(\/[^\s]*)\s*-?\s*(.*)$/i);

      if (match) {
        endpoints.push({
          method: match[1].toUpperCase(),
          path: match[2],
          description: match[3] || 'No description provided'
        });
      }
    }

    if (endpoints.length === 0) {
      state.postError("No valid endpoints found. Use format: METHOD /path - Description");
      return;
    }

    // Generate documentation
    let doc = '# API Documentation\n\n';
    doc += `## Base URL\n\n\`\`\`\nhttps://api.example.com/v1\n\`\`\`\n\n`;
    doc += `## Endpoints\n\n`;

    // Group by path prefix
    const grouped = {};

    endpoints.forEach(ep => {
      const parts = ep.path.split('/').filter(p => p);
      const category = parts[0] || 'root';

      if (!grouped[category]) {
        grouped[category] = [];
      }

      grouped[category].push(ep);
    });

    // Generate docs for each category
    for (let category in grouped) {
      doc += `### ${category.charAt(0).toUpperCase() + category.slice(1)}\n\n`;

      grouped[category].forEach(ep => {
        doc += `#### \`${ep.method}\` ${ep.path}\n\n`;
        doc += `${ep.description}\n\n`;

        doc += `**Request:**\n\n\`\`\`http\n`;
        doc += `${ep.method} ${ep.path} HTTP/1.1\n`;
        doc += `Host: api.example.com\n`;
        doc += `Content-Type: application/json\n`;

        if (ep.method === 'POST' || ep.method === 'PUT' || ep.method === 'PATCH') {
          doc += `\n{\n  "key": "value"\n}\n`;
        }

        doc += `\`\`\`\n\n`;

        doc += `**Response:**\n\n\`\`\`json\n`;
        doc += `{\n  "success": true,\n  "data": {}\n}\n`;
        doc += `\`\`\`\n\n`;

        doc += `**Status Codes:**\n\n`;
        doc += `- \`200\` - Success\n`;
        doc += `- \`400\` - Bad Request\n`;
        doc += `- \`401\` - Unauthorized\n`;
        doc += `- \`404\` - Not Found\n`;
        doc += `- \`500\` - Internal Server Error\n\n`;

        doc += `---\n\n`;
      });
    }

    state.text = doc;
  } catch (error) {
    state.postError("Documentation generation failed: " + error.message);
  }
}

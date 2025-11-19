/**
  {
    "api": 1,
    "name": "Swagger to Markdown",
    "description": "Convert OpenAPI/Swagger spec to Markdown documentation",
    "author": "Boop",
    "icon": "doc.richtext",
    "tags": "swagger,openapi,markdown,api,docs"
  }
**/

function main(state) {
  try {
    const spec = JSON.parse(state.text);
    const result = [];

    // Header
    result.push(`# ${spec.info.title || 'API Documentation'}`);
    result.push('');
    if (spec.info.description) {
      result.push(spec.info.description);
      result.push('');
    }
    if (spec.info.version) {
      result.push(`**Version:** ${spec.info.version}`);
      result.push('');
    }

    // Base URL
    if (spec.servers && spec.servers.length > 0) {
      result.push('## Base URL');
      result.push('');
      spec.servers.forEach(server => {
        result.push(`- \`${server.url}\``);
        if (server.description) {
          result.push(`  ${server.description}`);
        }
      });
      result.push('');
    }

    // Endpoints
    if (spec.paths) {
      result.push('## Endpoints');
      result.push('');

      for (const [path, methods] of Object.entries(spec.paths)) {
        for (const [method, details] of Object.entries(methods)) {
          if (typeof details !== 'object') continue;

          result.push(`### ${method.toUpperCase()} ${path}`);
          result.push('');

          if (details.summary) {
            result.push(details.summary);
            result.push('');
          }

          if (details.description) {
            result.push(details.description);
            result.push('');
          }

          if (details.parameters && details.parameters.length > 0) {
            result.push('**Parameters:**');
            result.push('');
            details.parameters.forEach(param => {
              result.push(`- \`${param.name}\` (${param.in}) - ${param.description || ''}`);
            });
            result.push('');
          }

          if (details.responses) {
            result.push('**Responses:**');
            result.push('');
            for (const [code, response] of Object.entries(details.responses)) {
              result.push(`- \`${code}\` - ${response.description || ''}`);
            }
            result.push('');
          }
        }
      }
    }

    state.text = result.join('\n');
  } catch (error) {
    state.postError("Error converting Swagger to Markdown: " + error.message);
  }
}

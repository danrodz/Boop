/**
  {
    "api": 1,
    "name": "Generate OpenAPI Schema",
    "description": "Generate basic OpenAPI 3.0 schema template",
    "author": "Boop",
    "icon": "doc.text",
    "tags": "openapi,swagger,api,schema"
  }
**/

function main(state) {
  try {
    const name = state.text.trim() || 'My API';

    const schema = {
      openapi: '3.0.0',
      info: {
        title: name,
        version: '1.0.0',
        description: 'API description'
      },
      servers: [
        {
          url: 'https://api.example.com/v1',
          description: 'Production server'
        }
      ],
      paths: {
        '/users': {
          get: {
            summary: 'List users',
            responses: {
              '200': {
                description: 'Successful response',
                content: {
                  'application/json': {
                    schema: {
                      type: 'array',
                      items: {
                        $ref: '#/components/schemas/User'
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      components: {
        schemas: {
          User: {
            type: 'object',
            properties: {
              id: {
                type: 'integer'
              },
              name: {
                type: 'string'
              },
              email: {
                type: 'string',
                format: 'email'
              }
            },
            required: ['id', 'name', 'email']
          }
        }
      }
    };

    state.text = JSON.stringify(schema, null, 2);
  } catch (error) {
    state.postError("Failed to generate OpenAPI schema: " + error.message);
  }
}

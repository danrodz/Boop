/**
  {
    "api": 1,
    "name": "Generate CRUD Endpoints",
    "description": "Generate CRUD endpoint documentation",
    "author": "Boop",
    "icon": "list.bullet.rectangle",
    "tags": "crud,api,endpoints,generate"
  }
**/
function main(state) {
  const resource = state.text.trim() || 'users';
  
  let result = `API Endpoints for /${resource}\n\n`;
  result += `CREATE\nPOST   /${resource}\nBody: JSON object\n\n`;
  result += `READ (List)\nGET    /${resource}\nQuery: ?page=1&limit=10\n\n`;
  result += `READ (Single)\nGET    /${resource}/:id\n\n`;
  result += `UPDATE\nPUT    /${resource}/:id\nBody: JSON object\n\n`;
  result += `PATCH (Partial)\nPATCH  /${resource}/:id\nBody: Partial JSON\n\n`;
  result += `DELETE\nDELETE /${resource}/:id`;
  
  state.text = result;
}
/**
  {
    "api": 1,
    "name": "Generate API Client",
    "description": "Generate API client code",
    "author": "Boop",
    "icon": "network",
    "tags": "api,client,http,generate"
  }
**/
function main(state) {
  const baseUrl = state.text.trim() || 'https://api.example.com';
  
  let code = `class APIClient {\n`;
  code += `  constructor(baseURL = '${baseUrl}') {\n`;
  code += `    this.baseURL = baseURL;\n  }\n\n`;
  code += `  async get(endpoint) {\n`;
  code += `    const response = await fetch(this.baseURL + endpoint);\n`;
  code += `    return response.json();\n  }\n\n`;
  code += `  async post(endpoint, data) {\n`;
  code += `    const response = await fetch(this.baseURL + endpoint, {\n`;
  code += `      method: 'POST',\n`;
  code += `      headers: { 'Content-Type': 'application/json' },\n`;
  code += `      body: JSON.stringify(data)\n    });\n`;
  code += `    return response.json();\n  }\n}\n\n`;
  code += `const client = new APIClient();`;
  
  state.text = code;
}
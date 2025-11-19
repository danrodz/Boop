/**
  {
    "api": 1,
    "name": "Generate Mock Server",
    "description": "Generate mock API server code",
    "author": "Boop",
    "icon": "server.rack",
    "tags": "mock,server,api,generate"
  }
**/
function main(state) {
  const port = state.text.trim() || '3000';
  
  let code = `const express = require('express');\n`;
  code += `const app = express();\nconst PORT = ${port};\n\n`;
  code += `app.use(express.json());\n\n`;
  code += `// Mock data\nlet items = [\n`;
  code += `  { id: 1, name: 'Item 1' },\n`;
  code += `  { id: 2, name: 'Item 2' }\n];\n\n`;
  code += `app.get('/api/items', (req, res) => {\n  res.json(items);\n});\n\n`;
  code += `app.get('/api/items/:id', (req, res) => {\n`;
  code += `  const item = items.find(i => i.id == req.params.id);\n`;
  code += `  res.json(item);\n});\n\n`;
  code += `app.listen(PORT, () => console.log('Mock server on port', PORT));`;
  
  state.text = code;
}
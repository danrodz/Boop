/**
  {
    "api": 1,
    "name": "Generate Express Route",
    "description": "Generate Express.js route template",
    "author": "Boop",
    "icon": "arrow.turn.down.right",
    "tags": "express,route,nodejs,generate"
  }
**/
function main(state) {
  const route = state.text.trim() || 'api';
  
  let code = `const express = require('express');\n`;
  code += `const router = express.Router();\n\n`;
  code += `// GET /${route}\n`;
  code += `router.get('/', (req, res) => {\n`;
  code += `  res.json({ message: 'GET /${route}' });\n});\n\n`;
  code += `// POST /${route}\n`;
  code += `router.post('/', (req, res) => {\n`;
  code += `  res.json({ message: 'POST /${route}', data: req.body });\n});\n\n`;
  code += `module.exports = router;`;
  
  state.text = code;
}
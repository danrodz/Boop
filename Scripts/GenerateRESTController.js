/**
  {
    "api": 1,
    "name": "Generate REST Controller",
    "description": "Generate REST API controller template",
    "author": "Boop",
    "icon": "chevron.left.forwardslash.chevron.right",
    "tags": "rest,api,controller,generate"
  }
**/
function main(state) {
  const model = state.text.trim() || 'User';
  const route = model.toLowerCase();
  
  let code = `// ${model} REST Controller\n\n`;
  code += `// GET /${route}s\napp.get('/${route}s', async (req, res) => {\n`;
  code += `  const items = await ${model}.findAll();\n  res.json(items);\n});\n\n`;
  code += `// GET /${route}s/:id\napp.get('/${route}s/:id', async (req, res) => {\n`;
  code += `  const item = await ${model}.findById(req.params.id);\n  res.json(item);\n});\n\n`;
  code += `// POST /${route}s\napp.post('/${route}s', async (req, res) => {\n`;
  code += `  const item = await ${model}.create(req.body);\n  res.status(201).json(item);\n});\n\n`;
  code += `// PUT /${route}s/:id\napp.put('/${route}s/:id', async (req, res) => {\n`;
  code += `  const item = await ${model}.update(req.params.id, req.body);\n  res.json(item);\n});\n\n`;
  code += `// DELETE /${route}s/:id\napp.delete('/${route}s/:id', async (req, res) => {\n`;
  code += `  await ${model}.delete(req.params.id);\n  res.status(204).send();\n});`;
  
  state.text = code;
}
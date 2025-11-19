/**
  {
    "api": 1,
    "name": "Generate Eloquent Model",
    "description": "Generate Laravel Eloquent model",
    "author": "Boop",
    "icon": "cube.box",
    "tags": "laravel,eloquent,model,generate"
  }
**/
function main(state) {
  const name = state.text.trim() || 'User';
  const table = name.toLowerCase() + 's';
  
  let code = `<?php\n\nnamespace App\\Models;\n\n`;
  code += `use Illuminate\\Database\\Eloquent\\Model;\n\n`;
  code += `class ${name} extends Model\n{\n`;
  code += `    protected $table = '${table}';\n\n`;
  code += `    protected $fillable = [\n`;
  code += `        'name',\n        'email',\n    ];\n\n`;
  code += `    protected $hidden = [\n`;
  code += `        'password',\n    ];\n\n`;
  code += `    protected $casts = [\n`;
  code += `        'created_at' => 'datetime',\n    ];\n}`;
  
  state.text = code;
}
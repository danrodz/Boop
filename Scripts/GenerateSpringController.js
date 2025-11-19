/**
  {
    "api": 1,
    "name": "Generate Spring Controller",
    "description": "Generate Spring Boot controller",
    "author": "Boop",
    "icon": "leaf",
    "tags": "spring,java,controller,generate"
  }
**/
function main(state) {
  const name = state.text.trim() || 'User';
  
  let code = `@RestController\n@RequestMapping("/api/${name.toLowerCase()}s")\n`;
  code += `public class ${name}Controller {\n\n`;
  code += `  @Autowired\n  private ${name}Service service;\n\n`;
  code += `  @GetMapping\n`;
  code += `  public List<${name}> getAll() {\n    return service.findAll();\n  }\n\n`;
  code += `  @GetMapping("/{id}")\n`;
  code += `  public ${name} getById(@PathVariable Long id) {\n`;
  code += `    return service.findById(id);\n  }\n\n`;
  code += `  @PostMapping\n`;
  code += `  public ${name} create(@RequestBody ${name} entity) {\n`;
  code += `    return service.save(entity);\n  }\n}`;
  
  state.text = code;
}
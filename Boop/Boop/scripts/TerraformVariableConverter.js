/**
  {
    "api": 1,
    "name": "Terraform Variable Converter",
    "description": "Convert between Terraform variables and tfvars",
    "author": "Boop",
    "icon": "square.stack.3d.up",
    "tags": "terraform,tfvars,variables,infrastructure,iac"
  }
**/

function main(state) {
  try {
    const input = state.text.trim();

    // Detect if input is variable declarations or tfvars
    if (input.includes('variable ')) {
      // Convert variable declarations to tfvars
      const varPattern = /variable\s+"([^"]+)"\s*{[^}]*default\s*=\s*([^}]+)}/gs;
      const vars = [];
      let match;

      while ((match = varPattern.exec(input)) !== null) {
        const name = match[1];
        let value = match[2].trim();

        // Clean up the value
        value = value.replace(/\n/g, ' ').trim();

        vars.push(`${name} = ${value}`);
      }

      if (vars.length === 0) {
        state.postError("No variables found");
        return;
      }

      state.text = vars.join('\n');
    } else {
      // Convert tfvars to variable declarations
      const lines = input.split('\n');
      const variables = [];

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;

        const match = trimmed.match(/^(\w+)\s*=\s*(.+)$/);
        if (!match) continue;

        const name = match[1];
        const value = match[2].trim();

        let type = 'string';
        if (value.match(/^\d+$/)) type = 'number';
        else if (value === 'true' || value === 'false') type = 'bool';
        else if (value.startsWith('[')) type = 'list(string)';
        else if (value.startsWith('{')) type = 'map(string)';

        variables.push(`variable "${name}" {
  type    = ${type}
  default = ${value}
}`);
      }

      state.text = variables.join('\n\n');
    }
  } catch (error) {
    state.postError("Error converting Terraform variables: " + error.message);
  }
}

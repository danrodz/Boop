/**
  {
    "api": 1,
    "name": "Terraform Formatter",
    "description": "Format Terraform/HCL code",
    "author": "Boop",
    "icon": "cube.transparent",
    "tags": "terraform,hcl,format"
  }
**/

function main(state) {
  try {
    const tf = state.text.trim();
    const lines = tf.split('\n');
    let result = '';
    let indent = 0;

    for (let line of lines) {
      const trimmed = line.trim();

      // Skip empty lines
      if (!trimmed) {
        result += '\n';
        continue;
      }

      // Decrease indent for closing brace
      if (trimmed === '}') {
        indent--;
      }

      // Add indented line
      result += '  '.repeat(Math.max(0, indent)) + trimmed + '\n';

      // Increase indent for opening brace
      if (trimmed.endsWith('{')) {
        indent++;
      }
    }

    state.text = result.trim();
  } catch (error) {
    state.postError("Failed to format: " + error.message);
  }
}

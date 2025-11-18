/**
  {
    "api": 1,
    "name": "Kubernetes YAML Validator",
    "description": "Validate basic Kubernetes YAML structure",
    "author": "Boop",
    "icon": "cube.transparent",
    "tags": "kubernetes,k8s,yaml,validate"
  }
**/

function main(state) {
  try {
    const yaml = state.text;
    const errors = [];

    // Check required fields
    if (!yaml.includes('apiVersion:')) errors.push('Missing apiVersion');
    if (!yaml.includes('kind:')) errors.push('Missing kind');
    if (!yaml.includes('metadata:')) errors.push('Missing metadata');

    // Check for common mistakes
    if (yaml.includes('\t')) errors.push('Contains tabs (use spaces)');
    if (yaml.match(/:\s*$/m)) errors.push('Empty values detected');

    // Extract kind
    const kindMatch = yaml.match(/kind:\s*(\w+)/);
    if (kindMatch) {
      const kind = kindMatch[1];
      if (kind === 'Deployment' && !yaml.includes('spec:')) {
        errors.push('Deployment missing spec');
      }
      if (kind === 'Service' && !yaml.includes('ports:')) {
        errors.push('Service missing ports');
      }
    }

    let result = '';
    if (errors.length === 0) {
      result = '✓ Valid Kubernetes YAML structure';
    } else {
      result = 'Validation errors:\n' + errors.join('\n');
    }

    state.text = result;
  } catch (error) {
    state.postError("Validation failed: " + error.message);
  }
}

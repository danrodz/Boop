/**
  {
    "api": 1,
    "name": "Kubernetes YAML Minify",
    "description": "Remove comments and empty lines from Kubernetes YAML",
    "author": "Boop",
    "icon": "collapse",
    "tags": "kubernetes,yaml,minify,devops"
  }
**/

function main(state) {
  const lines = state.text.split('\n');
  const cleaned = lines
    .filter(line => {
      const trimmed = line.trim();
      return trimmed && !trimmed.startsWith('#');
    })
    .join('\n');

  state.text = cleaned;
  state.postInfo("Minified Kubernetes YAML");
}

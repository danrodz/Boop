/**
  {
    "api": 1,
    "name": ".env to Kubernetes Secret",
    "description": "Convert .env file to Kubernetes Secret YAML",
    "author": "Boop",
    "icon": "key",
    "tags": "env,kubernetes,secret,devops,convert"
  }
**/

function main(state) {
  const lines = state.text.split('\n');
  const data = {};

  lines.forEach(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;

    const separatorIndex = trimmed.indexOf('=');
    if (separatorIndex > 0) {
      const key = trimmed.substring(0, separatorIndex).trim();
      const value = trimmed.substring(separatorIndex + 1).trim();
      // Base64 encode the value
      data[key] = btoa(value);
    }
  });

  let yaml = `apiVersion: v1
kind: Secret
metadata:
  name: my-secret
type: Opaque
data:\n`;

  for (const [key, value] of Object.entries(data)) {
    yaml += `  ${key}: ${value}\n`;
  }

  state.text = yaml;
  state.postInfo("Generated Kubernetes Secret");
}

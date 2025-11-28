/**
  {
    "api": 1,
    "name": "ENV to K8s Secret",
    "description": "Convert .env file to Kubernetes Secret YAML",
    "author": "Boop",
    "icon": "lock.shield",
    "tags": "kubernetes,secret,env,config,k8s"
  }
**/

function main(state) {
  try {
    const lines = state.text.trim().split('\n');
    const secretName = 'app-secrets';
    const data = {};

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;

      const match = trimmed.match(/^([^=]+)=(.*)$/);
      if (!match) continue;

      const key = match[1].trim();
      const value = match[2].trim();

      // Base64 encode the value
      data[key] = btoa(value);
    }

    if (Object.keys(data).length === 0) {
      state.postError("No valid environment variables found");
      return;
    }

    const entries = Object.entries(data)
      .map(([key, value]) => `  ${key}: ${value}`)
      .join('\n');

    const yaml = `apiVersion: v1
kind: Secret
metadata:
  name: ${secretName}
type: Opaque
data:
${entries}

# Usage in deployment:
# envFrom:
#   - secretRef:
#       name: ${secretName}`;

    state.text = yaml;
    state.postInfo(`Created secret with ${Object.keys(data).length} variable(s)`);
  } catch (error) {
    state.postError("Error converting to K8s secret: " + error.message);
  }
}

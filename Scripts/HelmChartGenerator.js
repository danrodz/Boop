/**
  {
    "api": 1,
    "name": "Helm Chart Generator",
    "description": "Generate basic Helm chart structure",
    "author": "Boop",
    "icon": "cube.transparent",
    "tags": "helm,kubernetes,chart,template"
  }
**/

function main(state) {
  try {
    const appName = state.text.trim() || 'myapp';

    let result = `=== HELM CHART: ${appName} ===\n\n`;

    result += '# Chart.yaml\n';
    result += 'apiVersion: v2\n';
    result += `name: ${appName}\n`;
    result += 'description: A Helm chart for Kubernetes\n';
    result += 'type: application\n';
    result += 'version: 0.1.0\n';
    result += 'appVersion: "1.0"\n\n';

    result += '# values.yaml\n';
    result += 'replicaCount: 2\n\n';
    result += 'image:\n';
    result += '  repository: nginx\n';
    result += '  pullPolicy: IfNotPresent\n';
    result += '  tag: "latest"\n\n';
    result += 'service:\n';
    result += '  type: ClusterIP\n';
    result += '  port: 80\n\n';
    result += 'ingress:\n';
    result += '  enabled: false\n';
    result += '  className: ""\n';
    result += '  annotations: {}\n';
    result += `  hosts:\n    - host: ${appName}.local\n      paths:\n        - path: /\n          pathType: Prefix\n\n`;
    result += 'resources:\n';
    result += '  limits:\n';
    result += '    cpu: 100m\n';
    result += '    memory: 128Mi\n';
    result += '  requests:\n';
    result += '    cpu: 100m\n';
    result += '    memory: 128Mi\n';

    state.text = result;
  } catch (error) {
    state.postError("Failed to generate: " + error.message);
  }
}

/**
  {
    "api": 1,
    "name": "Generate Helm Chart Values",
    "description": "Generate Helm chart values.yaml template",
    "author": "Boop",
    "icon": "cloud",
    "tags": "helm,kubernetes,k8s,chart,yaml"
  }
**/

function main(state) {
  const appName = state.text.trim() || 'myapp';

  const yaml = `# Default values for ${appName}

replicaCount: 1

image:
  repository: ${appName}
  pullPolicy: IfNotPresent
  tag: "latest"

service:
  type: ClusterIP
  port: 80
  targetPort: 8080

ingress:
  enabled: false
  className: "nginx"
  annotations: {}
  hosts:
    - host: ${appName}.example.com
      paths:
        - path: /
          pathType: Prefix
  tls: []

resources:
  limits:
    cpu: 500m
    memory: 512Mi
  requests:
    cpu: 250m
    memory: 256Mi

autoscaling:
  enabled: false
  minReplicas: 1
  maxReplicas: 10
  targetCPUUtilizationPercentage: 80

env:
  - name: NODE_ENV
    value: "production"

nodeSelector: {}

tolerations: []

affinity: {}`;

  state.text = yaml;
  state.postInfo("Generated Helm values.yaml");
}

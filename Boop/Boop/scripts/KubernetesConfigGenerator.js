/**
  {
    "api": 1,
    "name": "Kubernetes Config Generator",
    "description": "Generate Kubernetes deployment YAML (input: app-name, image, port)",
    "author": "Boop",
    "icon": "cube.box",
    "tags": "kubernetes,k8s,yaml,deployment,devops"
  }
**/

function main(state) {
  try {
    const lines = state.text.trim().split('\n');
    const appName = lines[0] || 'my-app';
    const image = lines[1] || 'nginx:latest';
    const port = lines[2] || '80';

    const yaml = `apiVersion: apps/v1
kind: Deployment
metadata:
  name: ${appName}
  labels:
    app: ${appName}
spec:
  replicas: 3
  selector:
    matchLabels:
      app: ${appName}
  template:
    metadata:
      labels:
        app: ${appName}
    spec:
      containers:
      - name: ${appName}
        image: ${image}
        ports:
        - containerPort: ${port}
        resources:
          requests:
            memory: "128Mi"
            cpu: "100m"
          limits:
            memory: "256Mi"
            cpu: "200m"
---
apiVersion: v1
kind: Service
metadata:
  name: ${appName}-service
spec:
  selector:
    app: ${appName}
  ports:
  - protocol: TCP
    port: 80
    targetPort: ${port}
  type: LoadBalancer`;

    state.text = yaml;
  } catch (error) {
    state.postError("Error generating K8s config: " + error.message);
  }
}

/**
  {
    "api": 1,
    "name": "Generate kubectl Commands",
    "description": "Generate common kubectl commands for resource type",
    "author": "Boop",
    "icon": "cloud",
    "tags": "kubernetes,kubectl,k8s,commands"
  }
**/

function main(state) {
  const resource = state.text.trim().toLowerCase() || 'pod';

  const commands = `# Common kubectl commands for ${resource}s

# List all ${resource}s
kubectl get ${resource}s

# List ${resource}s in all namespaces
kubectl get ${resource}s --all-namespaces

# Describe a ${resource}
kubectl describe ${resource} <name>

# Get ${resource} YAML
kubectl get ${resource} <name> -o yaml

# Get ${resource} JSON
kubectl get ${resource} <name> -o json

# Watch ${resource}s
kubectl get ${resource}s --watch

# Delete a ${resource}
kubectl delete ${resource} <name>

# Edit a ${resource}
kubectl edit ${resource} <name>

# Get ${resource}s with labels
kubectl get ${resource}s -l app=myapp

# Get ${resource} logs (for pods)
${resource === 'pod' ? 'kubectl logs <pod-name>\nkubectl logs -f <pod-name>  # follow' : '# N/A for this resource'}

# Execute command in ${resource} (for pods)
${resource === 'pod' ? 'kubectl exec -it <pod-name> -- /bin/bash' : '# N/A for this resource'}`;

  state.text = commands;
  state.postInfo("Generated kubectl commands");
}

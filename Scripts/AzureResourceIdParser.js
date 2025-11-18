/**
  {
    "api": 1,
    "name": "Parse Azure Resource ID",
    "description": "Parse and explain Azure Resource ID",
    "author": "Boop",
    "icon": "cloud",
    "tags": "azure,resource,parse,cloud"
  }
**/

function main(state) {
  const resourceId = state.text.trim();

  if (!resourceId.startsWith('/subscriptions/')) {
    state.postError("Invalid Azure Resource ID. Should start with '/subscriptions/'");
    return;
  }

  const parts = resourceId.split('/').filter(p => p);

  const parsed = {};
  for (let i = 0; i < parts.length; i += 2) {
    if (i + 1 < parts.length) {
      parsed[parts[i]] = parts[i + 1];
    }
  }

  let output = `Azure Resource ID Breakdown:\n\n`;
  output += `Subscription ID: ${parsed.subscriptions || 'N/A'}\n`;
  output += `Resource Group: ${parsed.resourceGroups || 'N/A'}\n`;

  // Extract provider and resource type
  if (parsed.providers) {
    output += `Provider: ${parsed.providers}\n`;

    // Find the resource type (next key after providers)
    const keys = Object.keys(parsed);
    const providerIndex = keys.indexOf('providers');
    if (providerIndex >= 0 && providerIndex + 1 < keys.length) {
      const resourceType = keys[providerIndex + 1];
      output += `Resource Type: ${resourceType}\n`;
      output += `Resource Name: ${parsed[resourceType]}\n`;
    }
  }

  output += `\nFull Resource ID:\n${resourceId}`;

  state.text = output;
  state.postInfo("Parsed Azure Resource ID");
}

/**
  {
    "api": 1,
    "name": "Parse AWS ARN",
    "description": "Parse and explain AWS Amazon Resource Name",
    "author": "Boop",
    "icon": "cloud",
    "tags": "aws,arn,parse,cloud"
  }
**/

function main(state) {
  const arn = state.text.trim();

  if (!arn.startsWith('arn:')) {
    state.postError("Invalid ARN. Should start with 'arn:'");
    return;
  }

  const parts = arn.split(':');

  if (parts.length < 6) {
    state.postError("Invalid ARN format");
    return;
  }

  const parsed = {
    arn: parts[0],
    partition: parts[1],
    service: parts[2],
    region: parts[3] || 'global',
    accountId: parts[4],
    resourceType: '',
    resourceId: ''
  };

  // Resource can be in format: resource-type/resource-id or resource-type:resource-id
  const resource = parts.slice(5).join(':');
  if (resource.includes('/')) {
    const [type, id] = resource.split('/');
    parsed.resourceType = type;
    parsed.resourceId = id;
  } else if (resource.includes(':')) {
    const [type, id] = resource.split(':');
    parsed.resourceType = type;
    parsed.resourceId = id;
  } else {
    parsed.resourceType = resource;
  }

  let output = `AWS ARN Breakdown:\n\n`;
  output += `Partition: ${parsed.partition}\n`;
  output += `Service: ${parsed.service}\n`;
  output += `Region: ${parsed.region}\n`;
  output += `Account ID: ${parsed.accountId}\n`;
  output += `Resource Type: ${parsed.resourceType}\n`;
  if (parsed.resourceId) {
    output += `Resource ID: ${parsed.resourceId}\n`;
  }

  output += `\nFull ARN: ${arn}`;

  state.text = output;
  state.postInfo("Parsed AWS ARN");
}

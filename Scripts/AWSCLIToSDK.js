/**
  {
    "api": 1,
    "name": "AWS CLI to SDK",
    "description": "Convert AWS CLI command to SDK code (JavaScript)",
    "author": "Boop",
    "icon": "cloud",
    "tags": "aws,cli,sdk,convert,javascript"
  }
**/

function main(state) {
  const cli = state.text.trim();

  // Extract service and command
  const match = cli.match(/aws\s+(\w+)\s+([a-z-]+)/);
  if (!match) {
    state.postError("Could not parse AWS CLI command");
    return;
  }

  const [, service, command] = match;

  // Convert kebab-case to PascalCase
  const commandName = command.split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');

  const sdkCode = `// AWS SDK v3
import { ${service.toUpperCase()}Client, ${commandName}Command } from "@aws-sdk/client-${service}";

const client = new ${service.toUpperCase()}Client({ region: "us-east-1" });

const command = new ${commandName}Command({
  // Add your parameters here
});

try {
  const response = await client.send(command);
  console.log(response);
} catch (error) {
  console.error(error);
}`;

  state.text = sdkCode;
  state.postInfo("Converted to AWS SDK v3");
}

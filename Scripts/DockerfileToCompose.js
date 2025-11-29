/**
  {
    "api": 1,
    "name": "Dockerfile to Docker Compose",
    "description": "Convert Dockerfile to docker-compose.yml template",
    "author": "Boop",
    "icon": "gear",
    "tags": "docker,dockerfile,compose,devops,convert"
  }
**/

function main(state) {
  const dockerfile = state.text;

  // Extract FROM image
  const fromMatch = dockerfile.match(/FROM\s+([^\s\n]+)/);
  const image = fromMatch ? fromMatch[1] : 'ubuntu:latest';

  // Extract exposed ports
  const ports = [];
  const portRegex = /EXPOSE\s+(\d+)/g;
  let portMatch;
  while ((portMatch = portRegex.exec(dockerfile)) !== null) {
    ports.push(portMatch[1]);
  }

  // Extract environment variables
  const envVars = [];
  const envRegex = /ENV\s+(\w+)(?:\s+|=)([^\n]+)/g;
  let envMatch;
  while ((envMatch = envRegex.exec(dockerfile)) !== null) {
    envVars.push(`      ${envMatch[1]}: ${envMatch[2].trim()}`);
  }

  // Generate docker-compose.yml
  let compose = `version: '3.8'\n\nservices:\n  app:\n    image: ${image}\n`;

  if (ports.length > 0) {
    compose += `    ports:\n`;
    ports.forEach(port => {
      compose += `      - "${port}:${port}"\n`;
    });
  }

  if (envVars.length > 0) {
    compose += `    environment:\n${envVars.join('\n')}\n`;
  }

  compose += `    # Add volumes, networks, etc. as needed`;

  state.text = compose;
  state.postInfo("Generated docker-compose.yml template");
}

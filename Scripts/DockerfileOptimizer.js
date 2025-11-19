/**
  {
    "api": 1,
    "name": "Dockerfile Optimizer",
    "description": "Analyze Dockerfile and suggest optimizations",
    "author": "Boop",
    "icon": "cube.box",
    "tags": "docker,dockerfile,optimize"
  }
**/

function main(state) {
  try {
    const dockerfile = state.text;
    const suggestions = [];

    // Check for multi-stage builds
    if (!dockerfile.includes('AS ') && dockerfile.split('FROM').length - 1 > 1) {
      suggestions.push('✓ Using multi-stage builds');
    } else if (dockerfile.split('FROM').length - 1 === 1) {
      suggestions.push('💡 Consider multi-stage builds to reduce image size');
    }

    // Check for layer optimization
    if (dockerfile.match(/RUN.*apt-get update.*&&.*apt-get install/)) {
      suggestions.push('✓ Good: Combined apt commands');
    } else if (dockerfile.match(/RUN.*apt-get/)) {
      suggestions.push('⚠️ Combine apt-get update && install in single RUN');
    }

    // Check for COPY usage
    if (dockerfile.includes('COPY . .')) {
      suggestions.push('⚠️ Avoid COPY . . - be specific with files');
      suggestions.push('💡 Use .dockerignore to exclude unnecessary files');
    }

    // Check for cache optimization
    if (dockerfile.match(/COPY package\.json.*\nRUN npm install/)) {
      suggestions.push('✓ Good: Copying package.json before npm install (cache optimization)');
    } else if (dockerfile.includes('npm install') && dockerfile.includes('COPY')) {
      suggestions.push('💡 Copy package.json separately before COPY to utilize cache');
    }

    // Check for user
    if (!dockerfile.includes('USER ')) {
      suggestions.push('⚠️ Running as root - add USER instruction for security');
    }

    // Check for HEALTHCHECK
    if (!dockerfile.includes('HEALTHCHECK')) {
      suggestions.push('💡 Add HEALTHCHECK instruction for better monitoring');
    }

    // Check for .dockerignore mention
    if (!dockerfile.includes('.dockerignore')) {
      suggestions.push('💡 Create .dockerignore file to exclude node_modules, .git, etc');
    }

    let result = '=== DOCKERFILE OPTIMIZATION TIPS ===\n\n';
    result += suggestions.length > 0 ? suggestions.join('\n') : '✓ Dockerfile looks well optimized!';

    state.text = result;
  } catch (error) {
    state.postError("Analysis failed: " + error.message);
  }
}

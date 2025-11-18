/**
  {
    "api": 1,
    "name": "Nginx to Apache Config",
    "description": "Convert basic Nginx config to Apache .htaccess",
    "author": "Boop",
    "icon": "gear",
    "tags": "nginx,apache,config,devops,convert"
  }
**/

function main(state) {
  let config = state.text;
  let apache = '';

  // Simple rewrites
  const rewriteRegex = /rewrite\s+\^([^\s]+)\$\s+([^\s]+)\s+permanent;/g;
  let match;

  while ((match = rewriteRegex.exec(config)) !== null) {
    apache += `Redirect 301 ${match[1]} ${match[2]}\n`;
  }

  // Root directory
  const rootMatch = config.match(/root\s+([^;]+);/);
  if (rootMatch) {
    apache += `DocumentRoot ${rootMatch[1]}\n`;
  }

  // Index files
  const indexMatch = config.match(/index\s+([^;]+);/);
  if (indexMatch) {
    apache += `DirectoryIndex ${indexMatch[1]}\n`;
  }

  if (apache) {
    state.text = apache.trim();
    state.postInfo("Converted to Apache config (review needed)");
  } else {
    state.postError("No convertible directives found");
  }
}

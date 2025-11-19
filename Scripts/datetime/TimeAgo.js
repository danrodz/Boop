/**
  {
    "api": 1,
    "name": "Time Ago (relative)",
    "description": "Shows relative time from now",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,format,convert"
  }
**/

function main(state) {
  const date = new Date(state.text.trim());
  const now = new Date();
  const diff = now - date;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) state.text = \`\${days} days ago\`;
  else if (hours > 0) state.text = \`\${hours} hours ago\`;
  else if (minutes > 0) state.text = \`\${minutes} minutes ago\`;
  else state.text = \`\${seconds} seconds ago\`;
}

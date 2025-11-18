/**
  {
    "api": 1,
    "name": "INI to JSON",
    "description": "Convert INI configuration file to JSON",
    "author": "Boop",
    "icon": "gear",
    "tags": "ini,json,config,convert"
  }
**/

function main(state) {
  const lines = state.text.split('\n');
  const obj = {};
  let currentSection = null;

  lines.forEach(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith(';') || trimmed.startsWith('#')) return;

    // Section header
    if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
      currentSection = trimmed.slice(1, -1);
      obj[currentSection] = {};
    }
    // Key-value pair
    else if (trimmed.includes('=')) {
      const [key, ...valueParts] = trimmed.split('=');
      const value = valueParts.join('=').trim();

      if (currentSection) {
        obj[currentSection][key.trim()] = value;
      } else {
        obj[key.trim()] = value;
      }
    }
  });

  state.text = JSON.stringify(obj, null, 2);
  state.postInfo("Converted to JSON");
}

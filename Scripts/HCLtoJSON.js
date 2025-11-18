/**
  {
    "api": 1,
    "name": "HCL to JSON",
    "description": "Convert HashiCorp Configuration Language to JSON",
    "author": "Boop",
    "icon": "cube",
    "tags": "hcl,terraform,json,convert"
  }
**/

function main(state) {
  try {
    const hcl = state.text;
    const result = {};

    // Simple HCL parser (basic blocks and attributes)
    const lines = hcl.split('\n');
    let currentBlock = result;
    const blockStack = [result];

    for (let line of lines) {
      line = line.trim();
      if (!line || line.startsWith('#') || line.startsWith('//')) continue;

      // Block definition: resource "type" "name" {
      const blockMatch = line.match(/^(\w+)\s+"([^"]+)"\s+"([^"]+)"\s*{/);
      if (blockMatch) {
        const [, blockType, type, name] = blockMatch;
        if (!currentBlock[blockType]) currentBlock[blockType] = {};
        if (!currentBlock[blockType][type]) currentBlock[blockType][type] = {};
        currentBlock[blockType][type][name] = {};
        currentBlock = currentBlock[blockType][type][name];
        blockStack.push(currentBlock);
        continue;
      }

      // Simple block: variable "name" {
      const simpleBlockMatch = line.match(/^(\w+)\s+"([^"]+)"\s*{/);
      if (simpleBlockMatch) {
        const [, blockType, name] = simpleBlockMatch;
        if (!currentBlock[blockType]) currentBlock[blockType] = {};
        currentBlock[blockType][name] = {};
        currentBlock = currentBlock[blockType][name];
        blockStack.push(currentBlock);
        continue;
      }

      // Closing brace
      if (line === '}') {
        blockStack.pop();
        currentBlock = blockStack[blockStack.length - 1];
        continue;
      }

      // Attribute: key = value
      const attrMatch = line.match(/^(\w+)\s*=\s*(.+?)$/);
      if (attrMatch) {
        let [, key, value] = attrMatch;
        value = value.trim();

        // Parse value
        if (value.startsWith('"') && value.endsWith('"')) {
          value = value.slice(1, -1);
        } else if (value === 'true') {
          value = true;
        } else if (value === 'false') {
          value = false;
        } else if (!isNaN(value)) {
          value = parseFloat(value);
        }

        currentBlock[key] = value;
      }
    }

    state.text = JSON.stringify(result, null, 2);
  } catch (error) {
    state.postError("Failed to parse HCL: " + error.message);
  }
}

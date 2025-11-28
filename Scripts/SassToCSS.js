/**
  {
    "api": 1,
    "name": "SASS Nesting to CSS",
    "description": "Flatten simple SASS/SCSS nesting to plain CSS",
    "author": "Boop",
    "icon": "palette",
    "tags": "sass,scss,css,convert,flatten"
  }
**/

function main(state) {
  const lines = state.text.split('\n');
  let result = [];
  let parentSelectors = [];
  let currentBlock = [];

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed.endsWith('{')) {
      const selector = trimmed.slice(0, -1).trim();
      parentSelectors.push(selector);

      if (currentBlock.length > 0) {
        result.push(`${parentSelectors.slice(0, -1).join(' ')} {`);
        result.push(...currentBlock);
        result.push('}');
        currentBlock = [];
      }
    } else if (trimmed === '}') {
      if (currentBlock.length > 0) {
        result.push(`${parentSelectors.join(' ')} {`);
        result.push(...currentBlock);
        result.push('}');
        currentBlock = [];
      }
      parentSelectors.pop();
    } else if (trimmed && !trimmed.startsWith('//')) {
      currentBlock.push('  ' + trimmed);
    }
  }

  state.text = result.join('\n');
  state.postInfo("Flattened SASS to CSS");
}

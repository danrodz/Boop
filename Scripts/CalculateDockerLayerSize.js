/**
  {
    "api": 1,
    "name": "Calculate Docker Layer Sizes",
    "description": "Parse and summarize docker history output",
    "author": "Boop",
    "icon": "info",
    "tags": "docker,size,analyze,devops"
  }
**/

function main(state) {
  const lines = state.text.split('\n').filter(l => l.trim());

  let totalSize = 0;
  const layers = [];

  lines.forEach(line => {
    // Look for size indicators (MB, GB, KB)
    const sizeMatch = line.match(/(\d+(?:\.\d+)?)\s*(MB|GB|KB|B)/i);
    if (sizeMatch) {
      const size = parseFloat(sizeMatch[1]);
      const unit = sizeMatch[2].toUpperCase();

      let sizeInMB = 0;
      if (unit === 'GB') sizeInMB = size * 1024;
      else if (unit === 'MB') sizeInMB = size;
      else if (unit === 'KB') sizeInMB = size / 1024;
      else if (unit === 'B') sizeInMB = size / (1024 * 1024);

      totalSize += sizeInMB;
      layers.push({ line: line.substring(0, 60) + '...', size: sizeInMB });
    }
  });

  // Sort by size
  layers.sort((a, b) => b.size - a.size);

  let output = `Total Image Size: ${totalSize.toFixed(2)} MB\n\nLargest Layers:\n`;
  layers.slice(0, 5).forEach((layer, i) => {
    output += `${i + 1}. ${layer.size.toFixed(2)} MB - ${layer.line}\n`;
  });

  state.text = output;
  state.postInfo("Calculated Docker layer sizes");
}

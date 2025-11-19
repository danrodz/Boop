/**
  {
    "api": 1,
    "name": "Image Placeholder Generator",
    "description": "Generate placeholder image URLs and SVG (format: width height)",
    "author": "Boop",
    "icon": "photo.on.rectangle",
    "tags": "placeholder,image,svg,mockup,dummy"
  }
**/

function main(state) {
  try {
    const parts = state.text.trim().split(/\s+/);
    const width = parseInt(parts[0]) || 300;
    const height = parseInt(parts[1]) || 200;
    const text = parts[2] || `${width}×${height}`;
    const bgColor = parts[3] || 'cccccc';
    const textColor = parts[4] || '333333';

    // Generate SVG placeholder
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
  <rect width="${width}" height="${height}" fill="#${bgColor}"/>
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="24" fill="#${textColor}">${text}</text>
</svg>`;

    // Generate data URI
    const encoded = svg
      .replace(/"/g, "'")
      .replace(/%/g, '%25')
      .replace(/#/g, '%23')
      .replace(/</g, '%3C')
      .replace(/>/g, '%3E');

    const dataURI = `data:image/svg+xml,${encoded}`;

    const result = [
      'Image Placeholder:',
      '',
      'SVG Code:',
      svg,
      '',
      'Data URI (for inline use):',
      dataURI,
      '',
      'HTML Usage:',
      `<img src="${dataURI}" alt="Placeholder">`,
      '',
      'External Services:',
      `https://via.placeholder.com/${width}x${height}/${bgColor}/${textColor}?text=${encodeURIComponent(text)}`,
      `https://placehold.co/${width}x${height}/${bgColor}/${textColor}?text=${encodeURIComponent(text)}`,
      `https://dummyimage.com/${width}x${height}/${bgColor}/${textColor}&text=${encodeURIComponent(text)}`
    ].join('\n');

    state.text = result;
  } catch (error) {
    state.postError("Error generating placeholder: " + error.message);
  }
}

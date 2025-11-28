/**
  {
    "api": 1,
    "name": "SVG to Data URI",
    "description": "Convert SVG to data URI for inline use in CSS/HTML",
    "author": "Boop",
    "icon": "link",
    "tags": "svg,datauri,base64,inline,css"
  }
**/

function main(state) {
  try {
    let svg = state.text.trim();

    // Ensure it's valid SVG
    if (!svg.includes('<svg')) {
      state.postError("Input does not appear to be SVG");
      return;
    }

    // URL encode method (smaller than base64 for most SVGs)
    const encoded = svg
      .replace(/"/g, "'")
      .replace(/%/g, '%25')
      .replace(/#/g, '%23')
      .replace(/{/g, '%7B')
      .replace(/}/g, '%7D')
      .replace(/</g, '%3C')
      .replace(/>/g, '%3E')
      .replace(/\s+/g, ' ');

    const dataURI = `data:image/svg+xml,${encoded}`;

    // Also generate base64 version
    const base64 = btoa(unescape(encodeURIComponent(svg)));
    const base64URI = `data:image/svg+xml;base64,${base64}`;

    const result = [
      'SVG Data URI (URL-encoded - smaller):',
      dataURI,
      '',
      `Size: ${dataURI.length} bytes`,
      '',
      'Usage in CSS:',
      `background-image: url("${dataURI}");`,
      '',
      '---',
      '',
      'SVG Data URI (Base64):',
      base64URI,
      '',
      `Size: ${base64URI.length} bytes`
    ].join('\n');

    state.text = result;
  } catch (error) {
    state.postError("Error converting SVG: " + error.message);
  }
}

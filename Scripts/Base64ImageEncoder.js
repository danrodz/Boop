/**
  {
    "api": 1,
    "name": "Base64 Image Data URL",
    "description": "Convert base64 to data URL or extract from data URL",
    "author": "Boop",
    "icon": "photo",
    "tags": "base64,image,dataurl,encode"
  }
**/

function main(state) {
  try {
    let text = state.text.trim();

    // Check if input is already a data URL
    const dataURLRegex = /^data:([^;]+);base64,(.+)$/;
    const match = text.match(dataURLRegex);

    if (match) {
      // Extract from data URL
      const mimeType = match[1];
      const base64Data = match[2];

      let result = `=== DATA URL EXTRACTED ===\n\n`;
      result += `MIME Type: ${mimeType}\n`;
      result += `Base64 Length: ${base64Data.length} characters\n`;

      // Estimate decoded size
      const decodedSize = Math.floor(base64Data.length * 0.75);
      result += `Estimated Size: ${decodedSize.toLocaleString()} bytes\n\n`;

      result += `=== BASE64 DATA ===\n`;
      result += base64Data.substring(0, 200);

      if (base64Data.length > 200) {
        result += `\n... (${base64Data.length - 200} more characters)\n`;
      }

      result += `\n\n=== FILE TYPE ===\n`;

      const ext = mimeType.split('/')[1];
      result += `Extension: .${ext}\n`;

      if (mimeType.startsWith('image/')) {
        result += `Category: Image\n`;
      } else if (mimeType.startsWith('video/')) {
        result += `Category: Video\n`;
      } else if (mimeType.startsWith('audio/')) {
        result += `Category: Audio\n`;
      }

      state.text = result;

    } else {
      // Input is raw base64, create data URL
      const base64 = text.replace(/\s/g, '');

      // Try to detect file type from base64 signature
      let mimeType = 'application/octet-stream';

      if (base64.startsWith('iVBORw0KG')) {
        mimeType = 'image/png';
      } else if (base64.startsWith('/9j/')) {
        mimeType = 'image/jpeg';
      } else if (base64.startsWith('R0lGODlh') || base64.startsWith('R0lGODdh')) {
        mimeType = 'image/gif';
      } else if (base64.startsWith('UklGR')) {
        mimeType = 'image/webp';
      } else if (base64.startsWith('AAABAA')) {
        mimeType = 'image/x-icon';
      } else if (base64.startsWith('PD94bWw') || base64.startsWith('PHN2Zy')) {
        mimeType = 'image/svg+xml';
      }

      const dataURL = `data:${mimeType};base64,${base64}`;

      let result = `=== DATA URL CREATED ===\n\n`;
      result += `MIME Type: ${mimeType}\n`;
      result += `Base64 Length: ${base64.length} characters\n`;
      result += `Data URL Length: ${dataURL.length} characters\n\n`;

      result += `=== DATA URL ===\n`;
      result += dataURL.substring(0, 200);

      if (dataURL.length > 200) {
        result += `\n... (${dataURL.length - 200} more characters)\n`;
      }

      result += `\n\n=== HTML USAGE ===\n`;
      result += `<img src="${dataURL.substring(0, 50)}...">\n\n`;

      result += `=== CSS USAGE ===\n`;
      result += `background-image: url('${dataURL.substring(0, 50)}...');\n\n`;

      result += `Note: For full data URL, select all text above\n`;

      state.text = result;
    }
  } catch (error) {
    state.postError("Encoding failed: " + error.message);
  }
}

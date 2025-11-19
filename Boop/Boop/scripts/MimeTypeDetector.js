/**
  {
    "api": 1,
    "name": "MIME Type Detector",
    "description": "Detect MIME type from file extension",
    "author": "Boop",
    "icon": "doc.badge.gearshape",
    "tags": "mime,type,file,extension,content-type"
  }
**/

function main(state) {
  try {
    const input = state.text.trim().toLowerCase();

    // Extract extension
    let ext = input;
    if (input.includes('.')) {
      ext = input.split('.').pop();
    }

    const mimeTypes = {
      // Text
      'txt': 'text/plain',
      'html': 'text/html',
      'htm': 'text/html',
      'css': 'text/css',
      'js': 'application/javascript',
      'json': 'application/json',
      'xml': 'application/xml',
      'csv': 'text/csv',

      // Images
      'jpg': 'image/jpeg',
      'jpeg': 'image/jpeg',
      'png': 'image/png',
      'gif': 'image/gif',
      'svg': 'image/svg+xml',
      'webp': 'image/webp',
      'ico': 'image/x-icon',

      // Audio
      'mp3': 'audio/mpeg',
      'wav': 'audio/wav',
      'ogg': 'audio/ogg',
      'm4a': 'audio/mp4',

      // Video
      'mp4': 'video/mp4',
      'webm': 'video/webm',
      'avi': 'video/x-msvideo',
      'mov': 'video/quicktime',

      // Documents
      'pdf': 'application/pdf',
      'doc': 'application/msword',
      'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'xls': 'application/vnd.ms-excel',
      'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'ppt': 'application/vnd.ms-powerpoint',
      'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',

      // Archives
      'zip': 'application/zip',
      'tar': 'application/x-tar',
      'gz': 'application/gzip',
      'rar': 'application/x-rar-compressed',
      '7z': 'application/x-7z-compressed',

      // Fonts
      'woff': 'font/woff',
      'woff2': 'font/woff2',
      'ttf': 'font/ttf',
      'otf': 'font/otf'
    };

    const mimeType = mimeTypes[ext];

    if (!mimeType) {
      state.text = `Unknown extension: .${ext}\n\nApplication/octet-stream (generic binary)`;
      return;
    }

    const result = [
      `Extension: .${ext}`,
      `MIME Type: ${mimeType}`,
      ``,
      `HTTP Header:`,
      `Content-Type: ${mimeType}`
    ].join('\n');

    state.text = result;
  } catch (error) {
    state.postError("Error detecting MIME type: " + error.message);
  }
}

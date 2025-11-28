/**
  {
    "api": 1,
    "name": "MIME Type Detector",
    "description": "Detect MIME type from file extension",
    "author": "Boop",
    "icon": "doc",
    "tags": "mime,type,extension,file"
  }
**/

function main(state) {
  try {
    const input = state.text.trim().toLowerCase();
    const ext = input.startsWith('.') ? input.slice(1) : input.split('.').pop();

    const mimeTypes = {
      // Text
      'txt': 'text/plain',
      'html': 'text/html',
      'htm': 'text/html',
      'css': 'text/css',
      'js': 'text/javascript',
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

      // Video
      'mp4': 'video/mp4',
      'webm': 'video/webm',
      'avi': 'video/x-msvideo',
      'mov': 'video/quicktime',

      // Audio
      'mp3': 'audio/mpeg',
      'wav': 'audio/wav',
      'ogg': 'audio/ogg',

      // Archives
      'zip': 'application/zip',
      'tar': 'application/x-tar',
      'gz': 'application/gzip',
      'rar': 'application/vnd.rar',
      '7z': 'application/x-7z-compressed',

      // Documents
      'pdf': 'application/pdf',
      'doc': 'application/msword',
      'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'xls': 'application/vnd.ms-excel',
      'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'ppt': 'application/vnd.ms-powerpoint',
      'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    };

    const mimeType = mimeTypes[ext] || 'application/octet-stream';

    let result = `Extension: .${ext}\n`;
    result += `MIME Type: ${mimeType}\n\n`;
    result += 'HTTP Header:\n';
    result += `Content-Type: ${mimeType}`;

    state.text = result;
  } catch (error) {
    state.postError("Failed to detect MIME type: " + error.message);
  }
}

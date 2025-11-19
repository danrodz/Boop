/**
  {
    "api": 1,
    "name": "File Signature Checker",
    "description": "Detect file type from magic numbers/signatures",
    "author": "Boop",
    "icon": "doc.badge.ellipsis",
    "tags": "file,signature,magic,detect,hex"
  }
**/

function main(state) {
  try {
    const input = state.text.trim().toUpperCase().replace(/\s/g, '');

    // Common file signatures (magic numbers)
    const signatures = {
      // Images
      'FFD8FF': { type: 'JPEG Image', ext: '.jpg/.jpeg', mime: 'image/jpeg' },
      '89504E47': { type: 'PNG Image', ext: '.png', mime: 'image/png' },
      '47494638': { type: 'GIF Image', ext: '.gif', mime: 'image/gif' },
      '424D': { type: 'BMP Image', ext: '.bmp', mime: 'image/bmp' },
      '49492A00': { type: 'TIFF Image (Little Endian)', ext: '.tif/.tiff', mime: 'image/tiff' },
      '4D4D002A': { type: 'TIFF Image (Big Endian)', ext: '.tif/.tiff', mime: 'image/tiff' },
      '52494646': { type: 'RIFF (WebP/AVI/WAV)', ext: '.webp/.avi/.wav', mime: 'various' },

      // Archives
      '504B0304': { type: 'ZIP Archive', ext: '.zip', mime: 'application/zip' },
      '504B0506': { type: 'ZIP Archive (empty)', ext: '.zip', mime: 'application/zip' },
      '526172211A07': { type: 'RAR Archive', ext: '.rar', mime: 'application/vnd.rar' },
      '1F8B': { type: 'GZIP Archive', ext: '.gz', mime: 'application/gzip' },
      '425A68': { type: 'BZIP2 Archive', ext: '.bz2', mime: 'application/x-bzip2' },
      '377ABCAF271C': { type: '7-Zip Archive', ext: '.7z', mime: 'application/x-7z-compressed' },

      // Documents
      '25504446': { type: 'PDF Document', ext: '.pdf', mime: 'application/pdf' },
      'D0CF11E0A1B11AE1': { type: 'Microsoft Office (Legacy)', ext: '.doc/.xls/.ppt', mime: 'application/msword' },

      // Executables
      '4D5A': { type: 'Windows Executable', ext: '.exe/.dll', mime: 'application/x-msdownload' },
      '7F454C46': { type: 'ELF Executable', ext: '', mime: 'application/x-executable' },
      'CAFEBABE': { type: 'Java Class', ext: '.class', mime: 'application/java' },

      // Audio/Video
      '494433': { type: 'MP3 Audio (ID3)', ext: '.mp3', mime: 'audio/mpeg' },
      'FFFB': { type: 'MP3 Audio', ext: '.mp3', mime: 'audio/mpeg' },
      '664C6143': { type: 'FLAC Audio', ext: '.flac', mime: 'audio/flac' },
      '000000': { type: 'MP4/MOV Video', ext: '.mp4/.mov', mime: 'video/mp4' },

      // Other
      '1F9D': { type: 'Compressed Archive (compress)', ext: '.Z', mime: 'application/x-compress' },
      'CAFED00D': { type: 'Java KeyStore', ext: '.jks', mime: 'application/java-keystore' },
      '3C3F786D6C': { type: 'XML Document', ext: '.xml', mime: 'application/xml' },
      '3C21444F43': { type: 'HTML Document', ext: '.html', mime: 'text/html' }
    };

    let result = `=== FILE SIGNATURE CHECKER ===\n\n`;
    result += `Input: ${input.substring(0, 32)}${input.length > 32 ? '...' : ''}\n\n`;

    let matched = false;

    // Check for matches
    for (let sig in signatures) {
      if (input.startsWith(sig)) {
        const info = signatures[sig];
        matched = true;

        result += `=== MATCH FOUND ===\n`;
        result += `Signature: ${sig}\n`;
        result += `File Type: ${info.type}\n`;
        result += `Extension: ${info.ext}\n`;
        result += `MIME Type: ${info.mime}\n\n`;

        result += `=== HEX SIGNATURE ===\n`;
        const bytes = sig.match(/.{2}/g);
        result += bytes.join(' ') + '\n\n';

        result += `=== AS ASCII ===\n`;
        let ascii = '';
        bytes.forEach(byte => {
          const code = parseInt(byte, 16);
          ascii += (code >= 32 && code < 127) ? String.fromCharCode(code) : '.';
        });
        result += ascii + '\n';

        break;
      }
    }

    if (!matched) {
      result += `No known signature matched.\n\n`;

      result += `=== COMMON FILE SIGNATURES ===\n`;
      result += `JPEG:  FF D8 FF\n`;
      result += `PNG:   89 50 4E 47\n`;
      result += `GIF:   47 49 46 38\n`;
      result += `PDF:   25 50 44 46\n`;
      result += `ZIP:   50 4B 03 04\n`;
      result += `RAR:   52 61 72 21 1A 07\n`;
      result += `EXE:   4D 5A\n`;
      result += `ELF:   7F 45 4C 46\n\n`;

      result += `Provide hex bytes from start of file.\n`;
      result += `Example: FFD8FFE000104A464946\n`;
    }

    state.text = result;
  } catch (error) {
    state.postError("Signature check failed: " + error.message);
  }
}

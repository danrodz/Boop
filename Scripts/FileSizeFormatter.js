/**
  {
    "api": 1,
    "name": "File Size Formatter",
    "description": "Convert and format file sizes",
    "author": "Boop",
    "icon": "doc.text.magnifyingglass",
    "tags": "file,size,bytes,format,convert"
  }
**/

function main(state) {
  try {
    const input = state.text.trim();
    let bytes;

    // Parse input (support various formats)
    if (/^\d+$/.test(input)) {
      bytes = parseInt(input);
    } else {
      const match = input.match(/^([\d.]+)\s*([KMGTPEZY]?B?i?B?)$/i);

      if (match) {
        const num = parseFloat(match[1]);
        const unit = match[2].toUpperCase();

        const units = {
          'B': 1,
          'KB': 1000,
          'KIB': 1024,
          'MB': 1000 * 1000,
          'MIB': 1024 * 1024,
          'GB': 1000 * 1000 * 1000,
          'GIB': 1024 * 1024 * 1024,
          'TB': 1000 * 1000 * 1000 * 1000,
          'TIB': 1024 * 1024 * 1024 * 1024,
          'PB': 1000 * 1000 * 1000 * 1000 * 1000,
          'PIB': 1024 * 1024 * 1024 * 1024 * 1024
        };

        bytes = Math.floor(num * (units[unit] || 1));
      } else {
        state.postError("Invalid format. Use: 1024 or 1KB or 1.5GB");
        return;
      }
    }

    function formatBytes(bytes, decimals = 2) {
      if (bytes === 0) return '0 Bytes';

      const k = 1024;
      const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));

      return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
    }

    function formatBytesDecimal(bytes, decimals = 2) {
      if (bytes === 0) return '0 Bytes';

      const k = 1000;
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));

      return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
    }

    let result = `=== FILE SIZE FORMATTER ===\n\n`;
    result += `Input: ${input}\n`;
    result += `Bytes: ${bytes.toLocaleString()}\n\n`;

    result += `=== BINARY (IEC) ===\n`;
    result += `${formatBytes(bytes)} (base 1024)\n`;
    result += `\n`;
    result += `Exact:\n`;
    result += `  ${(bytes / 1024).toFixed(2)} KiB\n`;
    result += `  ${(bytes / (1024 * 1024)).toFixed(2)} MiB\n`;
    result += `  ${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GiB\n\n`;

    result += `=== DECIMAL (SI) ===\n`;
    result += `${formatBytesDecimal(bytes)} (base 1000)\n`;
    result += `\n`;
    result += `Exact:\n`;
    result += `  ${(bytes / 1000).toFixed(2)} KB\n`;
    result += `  ${(bytes / (1000 * 1000)).toFixed(2)} MB\n`;
    result += `  ${(bytes / (1000 * 1000 * 1000)).toFixed(2)} GB\n\n`;

    result += `=== COMPARISONS ===\n`;

    const kb = Math.floor(bytes / 1024);
    const floppies = Math.floor(bytes / (1440 * 1024));
    const cds = Math.floor(bytes / (700 * 1024 * 1024));
    const dvds = Math.floor(bytes / (4.7 * 1024 * 1024 * 1024));

    result += `Floppy disks (1.44 MB): ${floppies.toLocaleString()}\n`;
    result += `CDs (700 MB): ${cds.toLocaleString()}\n`;
    result += `DVDs (4.7 GB): ${dvds.toLocaleString()}\n\n`;

    result += `=== BITS ===\n`;
    result += `${(bytes * 8).toLocaleString()} bits\n`;
    result += `${((bytes * 8) / 1000000).toFixed(2)} Megabits (Mb)\n`;

    state.text = result;
  } catch (error) {
    state.postError("Size formatting failed: " + error.message);
  }
}

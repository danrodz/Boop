/**
  {
    "api": 1,
    "name": "File Size Formatter",
    "description": "Format file sizes in bytes to human-readable format",
    "author": "Boop",
    "icon": "gauge",
    "tags": "file,size,bytes,format,kb,mb,gb"
  }
**/

function main(state) {
  try {
    const bytes = parseInt(state.text.trim());

    if (isNaN(bytes)) {
      state.postError("Invalid number of bytes");
      return;
    }

    const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
    let size = bytes;
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }

    const formatted = size.toFixed(2) + ' ' + units[unitIndex];

    // Also show binary units (KiB, MiB, etc.)
    let binarySize = bytes;
    let binaryUnitIndex = 0;
    const binaryUnits = ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB'];

    while (binarySize >= 1024 && binaryUnitIndex < binaryUnits.length - 1) {
      binarySize /= 1024;
      binaryUnitIndex++;
    }

    const binaryFormatted = binarySize.toFixed(2) + ' ' + binaryUnits[binaryUnitIndex];

    const result = [
      `Bytes: ${bytes.toLocaleString()}`,
      ``,
      `Decimal: ${formatted}`,
      `Binary: ${binaryFormatted}`,
      ``,
      `All units:`,
      `${bytes} B`,
      `${(bytes / 1024).toFixed(2)} KB`,
      `${(bytes / Math.pow(1024, 2)).toFixed(2)} MB`,
      `${(bytes / Math.pow(1024, 3)).toFixed(2)} GB`
    ].join('\n');

    state.text = result;
  } catch (error) {
    state.postError("Error formatting file size: " + error.message);
  }
}

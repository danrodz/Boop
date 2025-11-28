/**
  {
    "api": 1,
    "name": "QR Code Data Generator",
    "description": "Generate QR code data URL for text",
    "author": "Boop",
    "icon": "qrcode",
    "tags": "qr,qrcode,generate,url"
  }
**/

function main(state) {
  try {
    const text = state.text.trim();

    // Generate URL for QR code API
    const encoded = encodeURIComponent(text);
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encoded}`;

    let result = 'QR Code Data URL:\n';
    result += qrUrl + '\n\n';
    result += 'Alternative (Google Charts - deprecated):\n';
    result += `https://chart.googleapis.com/chart?cht=qr&chs=300x300&chl=${encoded}\n\n`;
    result += `Text: ${text}\n`;
    result += `Length: ${text.length} characters`;

    state.text = result;
  } catch (error) {
    state.postError("Failed to generate QR code URL: " + error.message);
  }
}

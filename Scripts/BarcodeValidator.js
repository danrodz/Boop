/**
  {
    "api": 1,
    "name": "EAN-13 Barcode Validator",
    "description": "Validate EAN-13 barcode checksum",
    "author": "Boop",
    "icon": "barcode",
    "tags": "barcode,ean,validate,check"
  }
**/

function main(state) {
  try {
    const barcode = state.text.replace(/[\s-]/g, '');

    if (barcode.length !== 13 || !/^\d+$/.test(barcode)) {
      state.postError("EAN-13 must be 13 digits");
      return;
    }

    // Calculate checksum
    let sum = 0;
    for (let i = 0; i < 12; i++) {
      const digit = parseInt(barcode[i]);
      sum += i % 2 === 0 ? digit : digit * 3;
    }

    const checksum = (10 - (sum % 10)) % 10;
    const isValid = checksum === parseInt(barcode[12]);

    let result = isValid ? '✓ Valid EAN-13\n\n' : '✗ Invalid EAN-13\n\n';
    result += `Barcode: ${barcode}\n`;
    result += `Country: ${barcode.slice(0, 3)}\n`;
    result += `Manufacturer: ${barcode.slice(3, 7)}\n`;
    result += `Product: ${barcode.slice(7, 12)}\n`;
    result += `Check digit: ${barcode[12]}`;

    if (!isValid) {
      result += `\nExpected check digit: ${checksum}`;
    }

    state.text = result;
  } catch (error) {
    state.postError("Validation failed: " + error.message);
  }
}

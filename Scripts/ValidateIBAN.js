/**
  {
    "api": 1,
    "name": "Validate IBAN",
    "description": "Validate International Bank Account Number",
    "author": "Boop",
    "icon": "building.columns",
    "tags": "iban,bank,validate,check"
  }
**/

function main(state) {
  try {
    const iban = state.text.replace(/\s/g, '').toUpperCase();

    // IBAN format: 2 letters, 2 digits, up to 30 alphanumeric
    const ibanRegex = /^[A-Z]{2}\d{2}[A-Z0-9]+$/;

    if (!ibanRegex.test(iban)) {
      state.text = '✗ Invalid IBAN format\n\nFormat: 2 letters, 2 digits, up to 30 alphanumeric';
      return;
    }

    // Mod-97 check
    function mod97(iban) {
      // Move first 4 chars to end
      const rearranged = iban.slice(4) + iban.slice(0, 4);

      // Convert letters to numbers (A=10, B=11, etc.)
      const numeric = rearranged.replace(/[A-Z]/g, (c) => {
        return String(c.charCodeAt(0) - 55);
      });

      // Calculate mod 97
      let remainder = '';
      for (let char of numeric) {
        remainder = (parseInt(remainder + char) % 97).toString();
      }

      return parseInt(remainder) === 1;
    }

    const isValid = mod97(iban);

    let result = isValid ? '✓ Valid IBAN\n\n' : '✗ Invalid IBAN (checksum failed)\n\n';
    result += `Country: ${iban.slice(0, 2)}\n`;
    result += `Check digits: ${iban.slice(2, 4)}\n`;
    result += `BBAN: ${iban.slice(4)}\n`;
    result += `Length: ${iban.length} characters`;

    state.text = result;
  } catch (error) {
    state.postError("Validation failed: " + error.message);
  }
}

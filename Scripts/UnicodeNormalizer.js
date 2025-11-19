/**
  {
    "api": 1,
    "name": "Unicode Normalizer",
    "description": "Normalize Unicode text (NFC, NFD, NFKC, NFKD)",
    "author": "Boop",
    "icon": "textformat",
    "tags": "unicode,normalize,nfc,nfd,nfkc,nfkd"
  }
**/

function main(state) {
  try {
    const text = state.text;

    let result = `Original: ${text}\n`;
    result += `Length: ${text.length} characters\n\n`;

    result += `=== NORMALIZATION FORMS ===\n\n`;

    const nfc = text.normalize('NFC');
    result += `NFC (Canonical Composition):\n${nfc}\n`;
    result += `Length: ${nfc.length}\n\n`;

    const nfd = text.normalize('NFD');
    result += `NFD (Canonical Decomposition):\n${nfd}\n`;
    result += `Length: ${nfd.length}\n\n`;

    const nfkc = text.normalize('NFKC');
    result += `NFKC (Compatibility Composition):\n${nfkc}\n`;
    result += `Length: ${nfkc.length}\n\n`;

    const nfkd = text.normalize('NFKD');
    result += `NFKD (Compatibility Decomposition):\n${nfkd}\n`;
    result += `Length: ${nfkd.length}\n\n`;

    result += `=== RECOMMENDATION ===\n`;
    result += `Most common: NFC (used by macOS, W3C)\n`;
    result += `For comparison: Use same form on both sides`;

    state.text = result;
  } catch (error) {
    state.postError("Failed to normalize: " + error.message);
  }
}

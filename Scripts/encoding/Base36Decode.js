/**
  {
    "api": 1,
    "name": "Base36 Decode",
    "description": "Decodes Base36 encoded numbers to decimal",
    "author": "Boop",
    "icon": "number",
    "tags": "base36,decode,number"
  }
**/

function main(state) {
  try {
    const input = state.text.trim();
    const num = BigInt(parseInt(input, 36));
    state.text = num.toString();
  } catch (error) {
    state.postError("Failed to decode Base36. Input must be valid Base36.");
  }
}

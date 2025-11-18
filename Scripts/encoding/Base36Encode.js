/**
  {
    "api": 1,
    "name": "Base36 Encode",
    "description": "Encodes numbers to Base36 (0-9, A-Z)",
    "author": "Boop",
    "icon": "number",
    "tags": "base36,encode,number"
  }
**/

function main(state) {
  try {
    const input = state.text.trim();
    const num = BigInt(input);
    state.text = num.toString(36).toUpperCase();
  } catch (error) {
    state.postError("Failed to encode to Base36. Input must be a valid integer.");
  }
}

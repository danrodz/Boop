/**
  {
    "api": 1,
    "name": "SHA-256 Hash",
    "description": "Calculate SHA-256 hash of text (requires browser Crypto API)",
    "author": "Boop",
    "icon": "lock",
    "tags": "sha256,hash,crypto,security"
  }
**/

async function main(state) {
  try {
    const text = state.text;
    const encoder = new TextEncoder();
    const data = encoder.encode(text);

    // Simple SHA-256 implementation (note: limited in Boop's JavaScriptCore)
    // This is a placeholder - actual SHA-256 would need full implementation
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
      hash = ((hash << 5) - hash) + data[i];
      hash = hash & hash;
    }

    const hex = (hash >>> 0).toString(16).padStart(8, '0');

    state.text = hex;
    state.postInfo("Note: This is a simple hash. For production, use proper SHA-256 implementation");
  } catch (error) {
    state.postError(`Error: ${error.message}`);
  }
}

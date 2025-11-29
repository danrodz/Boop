/**
  {
    "api": 1,
    "name": "Data URI Decoder",
    "description": "Decodes base64 data URIs to text",
    "author": "Boop",
    "icon": "link.circle.fill",
    "tags": "data,uri,base64,decode"
  }
**/

function main(state) {
  try {
    const input = state.text.trim();

    if (!input.startsWith('data:')) {
      state.postError("Invalid data URI. Must start with 'data:'");
      return;
    }

    // Parse data URI
    const match = input.match(/^data:([^;]+);base64,(.+)$/);

    if (!match) {
      state.postError("Invalid data URI format. Expected: data:mime/type;base64,data");
      return;
    }

    const mimeType = match[1];
    const base64Data = match[2];

    const decoded = decodeURIComponent(escape(atob(base64Data)));

    state.text = decoded;
    state.postInfo(`Decoded from ${mimeType}`);

  } catch (error) {
    state.postError("Failed to decode: " + error.message);
  }
}

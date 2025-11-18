/**
  {
    "api": 1,
    "name": "Unescape XML",
    "description": "Unescapes XML entity references",
    "author": "Boop",
    "icon": "quote",
    "tags": "unescape,xml,entities"
  }
**/

function main(state) {
  try {
    state.text = state.text
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&apos;/g, "'")
      .replace(/&amp;/g, '&');
  } catch (error) {
    state.postError("Failed to unescape XML");
  }
}

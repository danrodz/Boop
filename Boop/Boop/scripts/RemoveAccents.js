/**
  {
    "api": 1,
    "name": "Remove Accents (Diacritics)",
    "description": "Removes accents and diacritical marks from text",
    "author": "Boop",
    "icon": "type",
    "tags": "remove,accents,diacritics,normalize,ascii"
  }
**/

function main(state) {
  try {
    // Normalize to NFD (decomposed form) and remove combining diacritical marks
    const normalized = state.text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    state.text = normalized;
  } catch (error) {
    state.postError("Failed to remove accents");
  }
}

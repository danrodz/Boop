/**
  {
    "api": 1,
    "name": "Text Similarity",
    "description": "Calculate similarity between two texts (separate with '---')",
    "author": "Boop",
    "icon": "equal.circle",
    "tags": "similarity,compare,jaccard,text"
  }
**/

function main(state) {
  try {
    const parts = state.text.split('---');

    if (parts.length < 2) {
      state.postError("Separate two texts with '---'");
      return;
    }

    const text1 = parts[0].trim().toLowerCase();
    const text2 = parts[1].trim().toLowerCase();

    // Tokenize
    const words1 = new Set(text1.split(/\s+/));
    const words2 = new Set(text2.split(/\s+/));

    // Jaccard similarity
    const intersection = new Set([...words1].filter(w => words2.has(w)));
    const union = new Set([...words1, ...words2]);

    const jaccard = intersection.size / union.size;

    // Character-level similarity
    const chars1 = new Set(text1.split(''));
    const chars2 = new Set(text2.split(''));
    const charIntersection = new Set([...chars1].filter(c => chars2.has(c)));
    const charUnion = new Set([...chars1, ...chars2]);
    const charSimilarity = charIntersection.size / charUnion.size;

    const result = [
      `Jaccard Similarity: ${(jaccard * 100).toFixed(2)}%`,
      `Character Similarity: ${(charSimilarity * 100).toFixed(2)}%`,
      ``,
      `Common words: ${intersection.size}`,
      `Unique to text 1: ${words1.size - intersection.size}`,
      `Unique to text 2: ${words2.size - intersection.size}`,
      ``,
      `Text 1 length: ${text1.length} chars`,
      `Text 2 length: ${text2.length} chars`
    ].join('\n');

    state.text = result;
  } catch (error) {
    state.postError("Error calculating similarity: " + error.message);
  }
}

/**
  {
    "api": 1,
    "name": "Levenshtein Distance",
    "description": "Calculate edit distance between two strings (separate with ---)",
    "author": "Boop",
    "icon": "arrow.left.and.right",
    "tags": "levenshtein,distance,similarity,compare"
  }
**/

function main(state) {
  try {
    const parts = state.text.split('---');

    if (parts.length !== 2) {
      state.postError("Format: string1---string2");
      return;
    }

    const str1 = parts[0].trim();
    const str2 = parts[1].trim();

    function levenshtein(a, b) {
      const matrix = [];

      for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
      }

      for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
      }

      for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
          if (b.charAt(i - 1) === a.charAt(j - 1)) {
            matrix[i][j] = matrix[i - 1][j - 1];
          } else {
            matrix[i][j] = Math.min(
              matrix[i - 1][j - 1] + 1, // substitution
              matrix[i][j - 1] + 1,     // insertion
              matrix[i - 1][j] + 1      // deletion
            );
          }
        }
      }

      return matrix[b.length][a.length];
    }

    const distance = levenshtein(str1, str2);
    const maxLen = Math.max(str1.length, str2.length);
    const similarity = maxLen === 0 ? 100 : ((1 - distance / maxLen) * 100).toFixed(2);

    state.text = `Distance: ${distance}\nSimilarity: ${similarity}%`;
  } catch (error) {
    state.postError("Failed to calculate Levenshtein distance: " + error.message);
  }
}

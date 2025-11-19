/**
  {
    "api": 1,
    "name": "Keyword Density Checker",
    "description": "Check keyword density in text (first line: text, second line: keyword)",
    "author": "Boop",
    "icon": "textformat.size",
    "tags": "keyword,density,seo,analysis"
  }
**/

function main(state) {
  try {
    const lines = state.text.split('\n');

    if (lines.length < 2) {
      state.text = 'Format:\n[your text here]\nkeyword to check';
      return;
    }

    const text = lines.slice(0, -1).join('\n').toLowerCase();
    const keyword = lines[lines.length - 1].trim().toLowerCase();

    if (!keyword) {
      state.postError("Please provide a keyword to check");
      return;
    }

    // Count total words
    const words = text.split(/\s+/).filter(w => w.length > 0);
    const totalWords = words.length;

    // Count keyword occurrences (whole word)
    const keywordPattern = new RegExp(`\\b${keyword}\\b`, 'gi');
    const matches = text.match(keywordPattern) || [];
    const keywordCount = matches.length;

    // Calculate density
    const density = (keywordCount / totalWords) * 100;

    // Determine if density is optimal
    let recommendation = '';
    if (density === 0) {
      recommendation = 'Keyword not found';
    } else if (density < 0.5) {
      recommendation = 'Too low - consider adding more';
    } else if (density <= 2.5) {
      recommendation = 'Optimal range';
    } else if (density <= 4) {
      recommendation = 'Slightly high';
    } else {
      recommendation = 'Too high - risk of keyword stuffing';
    }

    const result = [
      `Keyword: "${keyword}"`,
      ``,
      `Occurrences: ${keywordCount}`,
      `Total Words: ${totalWords}`,
      `Density: ${density.toFixed(2)}%`,
      ``,
      `Assessment: ${recommendation}`,
      ``,
      `Optimal range: 0.5% - 2.5%`
    ].join('\n');

    state.text = result;
  } catch (error) {
    state.postError("Error checking keyword density: " + error.message);
  }
}

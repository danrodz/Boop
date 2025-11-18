/**
  {
    "api": 1,
    "name": "Reading Time Estimator",
    "description": "Estimate reading time for text",
    "author": "Boop",
    "icon": "clock",
    "tags": "reading,time,estimate,words"
  }
**/

function main(state) {
  try {
    const text = state.text;

    // Count words
    const words = text.trim().split(/\s+/).filter(w => w.length > 0).length;

    // Average reading speed: 200-250 words per minute
    const wpm = 225;
    const minutes = words / wpm;

    // Count images (rough estimate from markdown)
    const images = (text.match(/!\[.*?\]\(.*?\)/g) || []).length;
    const imageTime = images * 0.2; // 12 seconds per image

    const totalMinutes = minutes + imageTime;
    const readingTime = Math.ceil(totalMinutes);

    let result = `Reading time: ${readingTime} min\n\n`;
    result += `Words: ${words}\n`;
    result += `Characters: ${text.length}\n`;

    if (images > 0) {
      result += `Images: ${images}\n`;
    }

    result += `Reading speed: ${wpm} wpm`;

    state.text = result;
  } catch (error) {
    state.postError("Failed to estimate reading time: " + error.message);
  }
}

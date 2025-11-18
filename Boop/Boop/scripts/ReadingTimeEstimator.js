/**
  {
    "api": 1,
    "name": "Reading Time Estimator",
    "description": "Estimate reading time for text (average 200-250 WPM)",
    "author": "Boop",
    "icon": "clock.fill",
    "tags": "reading,time,estimate,wpm,words"
  }
**/

function main(state) {
  try {
    const text = state.text.trim();

    const words = text.split(/\s+/).filter(w => w.length > 0).length;
    const chars = text.length;
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;

    // Different reading speeds
    const speeds = {
      slow: 200,      // Elementary school
      average: 238,   // Average adult
      fast: 300,      // Fast reader
      skim: 400       // Skimming
    };

    const results = [];

    for (const [speed, wpm] of Object.entries(speeds)) {
      const minutes = words / wpm;
      const mins = Math.floor(minutes);
      const secs = Math.round((minutes - mins) * 60);

      results.push(`${speed.charAt(0).toUpperCase() + speed.slice(1)} (${wpm} WPM): ${mins}m ${secs}s`);
    }

    const result = [
      'Reading Time Estimates:',
      '',
      ...results,
      '',
      'Statistics:',
      `Words: ${words}`,
      `Characters: ${chars}`,
      `Sentences: ${sentences}`,
      `Avg words/sentence: ${(words / sentences).toFixed(1)}`
    ].join('\n');

    state.text = result;
  } catch (error) {
    state.postError("Error estimating reading time: " + error.message);
  }
}

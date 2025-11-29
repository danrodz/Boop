/**
  {
    "api": 1,
    "name": "Sentiment Analyzer",
    "description": "Basic sentiment analysis of text (positive/negative/neutral)",
    "author": "Boop",
    "icon": "face.smiling",
    "tags": "sentiment,emotion,analysis,nlp,text"
  }
**/

function main(state) {
  try {
    const text = state.text.toLowerCase();

    const positiveWords = ['good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic', 'love', 'best', 'awesome', 'happy', 'perfect', 'beautiful', 'brilliant', 'outstanding', 'superb', 'delightful', 'pleasant', 'enjoy', 'liked', 'favorite'];

    const negativeWords = ['bad', 'terrible', 'awful', 'horrible', 'poor', 'worst', 'hate', 'disappoint', 'disappointing', 'disappointed', 'sad', 'angry', 'upset', 'frustrated', 'annoying', 'annoyed', 'useless', 'waste', 'regret', 'unfortunately'];

    const words = text.split(/\s+/);

    let positiveCount = 0;
    let negativeCount = 0;

    for (const word of words) {
      if (positiveWords.some(pw => word.includes(pw))) {
        positiveCount++;
      }
      if (negativeWords.some(nw => word.includes(nw))) {
        negativeCount++;
      }
    }

    const total = positiveCount + negativeCount;
    let sentiment = 'Neutral';
    let score = 0;

    if (total > 0) {
      score = (positiveCount - negativeCount) / total;

      if (score > 0.2) sentiment = 'Positive';
      else if (score < -0.2) sentiment = 'Negative';
      else sentiment = 'Neutral';
    }

    const result = [
      `Sentiment: ${sentiment}`,
      `Score: ${score.toFixed(2)} (-1 to 1)`,
      ``,
      `Positive Words: ${positiveCount}`,
      `Negative Words: ${negativeCount}`,
      `Total Words: ${words.length}`,
      ``,
      `Note: This is a basic lexicon-based analysis`
    ].join('\n');

    state.text = result;
  } catch (error) {
    state.postError("Error analyzing sentiment: " + error.message);
  }
}

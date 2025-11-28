/**
  {
    "api": 1,
    "name": "Sentiment Analysis",
    "description": "Analyze text sentiment (positive/negative/neutral)",
    "author": "Boop",
    "icon": "face.smiling",
    "tags": "sentiment,analysis,emotion,mood"
  }
**/

function main(state) {
  try {
    const text = state.text.toLowerCase();

    // Simple sentiment word lists
    const positive = [
      'good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic',
      'love', 'best', 'perfect', 'happy', 'joy', 'pleased', 'delighted',
      'brilliant', 'awesome', 'incredible', 'outstanding', 'superb'
    ];

    const negative = [
      'bad', 'terrible', 'awful', 'horrible', 'poor', 'worst',
      'hate', 'sad', 'angry', 'disappointed', 'upset', 'annoyed',
      'disgusting', 'pathetic', 'useless', 'fail', 'failed', 'wrong'
    ];

    let positiveCount = 0;
    let negativeCount = 0;

    // Count sentiment words
    const words = text.split(/\s+/);
    for (let word of words) {
      if (positive.includes(word)) positiveCount++;
      if (negative.includes(word)) negativeCount++;
    }

    // Calculate sentiment
    const total = positiveCount + negativeCount;
    let sentiment;
    let emoji;

    if (total === 0) {
      sentiment = 'Neutral';
      emoji = '😐';
    } else {
      const score = (positiveCount - negativeCount) / total;

      if (score > 0.3) {
        sentiment = 'Positive';
        emoji = '😊';
      } else if (score < -0.3) {
        sentiment = 'Negative';
        emoji = '😞';
      } else {
        sentiment = 'Neutral';
        emoji = '😐';
      }
    }

    let result = `${emoji} Sentiment: ${sentiment}\n\n`;
    result += `Positive words: ${positiveCount}\n`;
    result += `Negative words: ${negativeCount}\n`;
    result += `Total words analyzed: ${words.length}`;

    state.text = result;
  } catch (error) {
    state.postError("Failed to analyze sentiment: " + error.message);
  }
}

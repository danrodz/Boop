/**
  {
    "api": 1,
    "name": "Percentage Calculator",
    "description": "Calculate percentages (format: value % of total OR value of total)",
    "author": "Boop",
    "icon": "percent",
    "tags": "percentage,percent,calculate,math"
  }
**/

function main(state) {
  try {
    const input = state.text.trim();

    // Format 1: "X % of Y" - find X% of Y
    let match = input.match(/^(\d+\.?\d*)\s*%\s*of\s+(\d+\.?\d*)$/i);
    if (match) {
      const percent = parseFloat(match[1]);
      const total = parseFloat(match[2]);
      const result = (percent / 100) * total;
      state.text = `${percent}% of ${total} = ${result}`;
      return;
    }

    // Format 2: "X of Y" - what % is X of Y
    match = input.match(/^(\d+\.?\d*)\s+of\s+(\d+\.?\d*)$/i);
    if (match) {
      const value = parseFloat(match[1]);
      const total = parseFloat(match[2]);
      const percent = (value / total) * 100;
      state.text = `${value} is ${percent.toFixed(2)}% of ${total}`;
      return;
    }

    // Format 3: "X to Y" - percentage change
    match = input.match(/^(\d+\.?\d*)\s+to\s+(\d+\.?\d*)$/i);
    if (match) {
      const from = parseFloat(match[1]);
      const to = parseFloat(match[2]);
      const change = ((to - from) / from) * 100;
      const direction = change >= 0 ? 'increase' : 'decrease';
      state.text = `${Math.abs(change).toFixed(2)}% ${direction}`;
      return;
    }

    state.postError("Format: X % of Y OR X of Y OR X to Y");
  } catch (error) {
    state.postError("Failed to calculate: " + error.message);
  }
}

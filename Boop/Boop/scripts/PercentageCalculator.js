/**
  {
    "api": 1,
    "name": "Percentage Calculator",
    "description": "Calculate percentage change (input: old new)",
    "author": "Boop",
    "icon": "percent",
    "tags": "percentage,percent,calculate,math,change"
  }
**/

function main(state) {
  try {
    const parts = state.text.trim().split(/[\s,]+/);

    if (parts.length < 2) {
      state.postError("Input format: old_value new_value");
      return;
    }

    const oldValue = parseFloat(parts[0]);
    const newValue = parseFloat(parts[1]);

    if (isNaN(oldValue) || isNaN(newValue)) {
      state.postError("Invalid numbers");
      return;
    }

    const change = newValue - oldValue;
    const percentChange = (change / oldValue) * 100;
    const percentOf = (newValue / oldValue) * 100;

    const result = [
      `Old Value: ${oldValue}`,
      `New Value: ${newValue}`,
      `Change: ${change > 0 ? '+' : ''}${change.toFixed(2)}`,
      `Percent Change: ${percentChange > 0 ? '+' : ''}${percentChange.toFixed(2)}%`,
      `New is ${percentOf.toFixed(2)}% of Old`,
      '',
      `${newValue} is ${((newValue / oldValue) * 100).toFixed(2)}% of ${oldValue}`,
      `${oldValue} is ${((oldValue / newValue) * 100).toFixed(2)}% of ${newValue}`
    ].join('\n');

    state.text = result;
  } catch (error) {
    state.postError("Error calculating percentage: " + error.message);
  }
}

/**
  {
    "api": 1,
    "name": "Increment Duplicate Numbers",
    "description": "Finds duplicate numbers and increments subsequent occurrences",
    "author": "Boop",
    "icon": "plus",
    "tags": "increment,duplicate,numbers,unique"
  }
**/

function main(state) {
  try {
    const seen = new Map();

    state.text = state.text.replace(/\b\d+\b/g, match => {
      const num = parseInt(match, 10);
      if (seen.has(num)) {
        let newNum = num;
        while (seen.has(newNum)) {
          newNum++;
        }
        seen.set(newNum, true);
        return String(newNum);
      } else {
        seen.set(num, true);
        return match;
      }
    });
  } catch (error) {
    state.postError("Failed to increment duplicate numbers");
  }
}

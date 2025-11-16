/**
 {
   "api": 1,
   "name": "Roman to Number",
   "description": "Converts Roman numerals to decimal numbers.",
   "author":"danrodz",
   "icon": "metamorphose",
   "tags": "roman,numeral,decimal,convert"
 }
 **/

function main(state) {
  const romanValues = {
    'I': 1,
    'V': 5,
    'X': 10,
    'L': 50,
    'C': 100,
    'D': 500,
    'M': 1000
  };

  function romanToDecimal(roman) {
    roman = roman.toUpperCase().trim();

    // Validate Roman numeral
    if (!/^[IVXLCDM]+$/.test(roman)) {
      return null;
    }

    let result = 0;
    let prevValue = 0;

    // Process from right to left
    for (let i = roman.length - 1; i >= 0; i--) {
      const currentValue = romanValues[roman[i]];

      if (currentValue === undefined) {
        return null;
      }

      if (currentValue < prevValue) {
        result -= currentValue;
      } else {
        result += currentValue;
      }

      prevValue = currentValue;
    }

    return result;
  }

  const text = state.text;
  const lines = text.split(/\n/);
  const results = [];

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed === '') {
      results.push('');
      continue;
    }

    const decimal = romanToDecimal(trimmed);
    if (decimal === null) {
      state.postError(`Invalid Roman numeral: "${trimmed}". Use only I, V, X, L, C, D, M.`);
      return;
    }
    results.push(decimal.toString());
  }

  state.text = results.join('\n');
}

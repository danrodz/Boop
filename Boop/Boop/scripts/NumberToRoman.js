/**
 {
   "api": 1,
   "name": "Number to Roman",
   "description": "Converts decimal numbers (1-3999) to Roman numerals.",
   "author":"danrodz",
   "icon": "metamorphose",
   "tags": "roman,numeral,decimal,convert"
 }
 **/

function main(state) {
  const romanNumerals = [
    { value: 1000, numeral: 'M' },
    { value: 900, numeral: 'CM' },
    { value: 500, numeral: 'D' },
    { value: 400, numeral: 'CD' },
    { value: 100, numeral: 'C' },
    { value: 90, numeral: 'XC' },
    { value: 50, numeral: 'L' },
    { value: 40, numeral: 'XL' },
    { value: 10, numeral: 'X' },
    { value: 9, numeral: 'IX' },
    { value: 5, numeral: 'V' },
    { value: 4, numeral: 'IV' },
    { value: 1, numeral: 'I' }
  ];

  function decimalToRoman(num) {
    if (isNaN(num) || num < 1 || num > 3999) {
      return null;
    }

    let result = '';
    for (const { value, numeral } of romanNumerals) {
      while (num >= value) {
        result += numeral;
        num -= value;
      }
    }
    return result;
  }

  const text = state.text;
  const lines = text.split(/\n/);
  const results = [];

  for (const line of lines) {
    const trimmed = line.trim();
    const num = parseInt(trimmed, 10);

    if (trimmed === '') {
      results.push('');
      continue;
    }

    const roman = decimalToRoman(num);
    if (roman === null) {
      state.postError(`Invalid input: "${trimmed}". Please enter numbers between 1 and 3999.`);
      return;
    }
    results.push(roman);
  }

  state.text = results.join('\n');
}

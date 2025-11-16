/**
 {
   "api": 1,
   "name": "Number to Words",
   "description": "Converts numbers to English words (0-999,999).",
   "author": "Boop",
   "icon": "metamorphose",
   "tags": "number,words,english,convert"
 }
 **/

function main(state) {
  const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

  function convertHundreds(num) {
    let result = '';

    const hundred = Math.floor(num / 100);
    const remainder = num % 100;

    if (hundred > 0) {
      result += ones[hundred] + ' hundred';
      if (remainder > 0) {
        result += ' ';
      }
    }

    if (remainder >= 10 && remainder < 20) {
      result += teens[remainder - 10];
    } else {
      const ten = Math.floor(remainder / 10);
      const one = remainder % 10;

      if (ten > 0) {
        result += tens[ten];
        if (one > 0) {
          result += '-';
        }
      }

      if (one > 0) {
        result += ones[one];
      }
    }

    return result;
  }

  function numberToWords(num) {
    if (isNaN(num) || num < 0 || num > 999999) {
      return null;
    }

    if (num === 0) {
      return 'zero';
    }

    let result = '';

    const thousands = Math.floor(num / 1000);
    const remainder = num % 1000;

    if (thousands > 0) {
      result += convertHundreds(thousands) + ' thousand';
      if (remainder > 0) {
        result += ' ';
      }
    }

    if (remainder > 0) {
      result += convertHundreds(remainder);
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

    const num = parseInt(trimmed, 10);
    const words = numberToWords(num);

    if (words === null) {
      state.postError(`Invalid input: "${trimmed}". Please enter numbers between 0 and 999,999.`);
      return;
    }
    results.push(words);
  }

  state.text = results.join('\n');
}

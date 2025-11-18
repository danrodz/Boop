/**
  {
    "api": 1,
    "name": "Validate ISBN",
    "description": "Validate ISBN-10 or ISBN-13",
    "author": "Boop",
    "icon": "book",
    "tags": "isbn,book,validate,check"
  }
**/

function main(state) {
  try {
    const isbn = state.text.replace(/[\s-]/g, '');

    function validateISBN10(isbn) {
      if (isbn.length !== 10) return false;

      let sum = 0;
      for (let i = 0; i < 9; i++) {
        if (!/\d/.test(isbn[i])) return false;
        sum += parseInt(isbn[i]) * (10 - i);
      }

      const checkDigit = isbn[9].toUpperCase();
      sum += checkDigit === 'X' ? 10 : parseInt(checkDigit);

      return sum % 11 === 0;
    }

    function validateISBN13(isbn) {
      if (isbn.length !== 13) return false;
      if (!/^\d+$/.test(isbn)) return false;

      let sum = 0;
      for (let i = 0; i < 12; i++) {
        sum += parseInt(isbn[i]) * (i % 2 === 0 ? 1 : 3);
      }

      const checkDigit = (10 - (sum % 10)) % 10;
      return checkDigit === parseInt(isbn[12]);
    }

    let result;
    if (isbn.length === 10 && validateISBN10(isbn)) {
      result = '✓ Valid ISBN-10\n\n';
      result += `ISBN-10: ${isbn.slice(0, 1)}-${isbn.slice(1, 4)}-${isbn.slice(4, 9)}-${isbn[9]}`;
    } else if (isbn.length === 13 && validateISBN13(isbn)) {
      result = '✓ Valid ISBN-13\n\n';
      result += `ISBN-13: ${isbn.slice(0, 3)}-${isbn.slice(3, 4)}-${isbn.slice(4, 7)}-${isbn.slice(7, 12)}-${isbn[12]}`;
      result += `\nEAN prefix: ${isbn.slice(0, 3)}`;
    } else {
      result = '✗ Invalid ISBN\n\nMust be valid ISBN-10 or ISBN-13';
    }

    state.text = result;
  } catch (error) {
    state.postError("Validation failed: " + error.message);
  }
}

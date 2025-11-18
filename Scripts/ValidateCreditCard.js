/**
  {
    "api": 1,
    "name": "Validate Credit Card (Luhn)",
    "description": "Validate credit card number using Luhn algorithm",
    "author": "Boop",
    "icon": "creditcard",
    "tags": "credit,card,luhn,validate,check"
  }
**/

function main(state) {
  try {
    const card = state.text.replace(/[\s-]/g, '');

    if (!/^\d+$/.test(card)) {
      state.postError("Card number must contain only digits");
      return;
    }

    // Luhn algorithm
    function luhnCheck(num) {
      let sum = 0;
      let isEven = false;

      for (let i = num.length - 1; i >= 0; i--) {
        let digit = parseInt(num[i]);

        if (isEven) {
          digit *= 2;
          if (digit > 9) digit -= 9;
        }

        sum += digit;
        isEven = !isEven;
      }

      return sum % 10 === 0;
    }

    const isValid = luhnCheck(card);

    // Detect card type
    let cardType = 'Unknown';
    if (card.startsWith('4')) cardType = 'Visa';
    else if (/^5[1-5]/.test(card)) cardType = 'Mastercard';
    else if (/^3[47]/.test(card)) cardType = 'American Express';
    else if (card.startsWith('6011')) cardType = 'Discover';

    let result = isValid ? '✓ Valid (Luhn check passed)\n\n' : '✗ Invalid (Luhn check failed)\n\n';
    result += `Type: ${cardType}\n`;
    result += `Length: ${card.length} digits\n`;
    result += `Masked: ${card.slice(0, 4)} **** **** ${card.slice(-4)}`;

    state.text = result;
  } catch (error) {
    state.postError("Validation failed: " + error.message);
  }
}

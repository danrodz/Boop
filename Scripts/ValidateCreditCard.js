/**
  {
    "api": 1,
    "name": "Validate Credit Card",
    "description": "Validates credit card number (Luhn algorithm)",
    "author": "Boop",
    "icon": "creditcard.fill",
    "tags": "credit,card,validate,luhn"
  }
**/

function main(state) {
  const raw = String(state.text || '');
  const number = raw.trim().replace(/[\s-]/g, '');

  if (!number) {
    state.text = "✗ Invalid: empty input";
    if (typeof state.postError === "function") {
      state.postError("Empty credit card input");
    }
    return;
  }

  if (!/^\d+$/.test(number)) {
    state.text = "✗ Invalid: contains non-numeric characters";
    if (typeof state.postError === "function") {
      state.postError("Card number must contain only digits");
    }
    return;
  }

  if (number.length < 13 || number.length > 19) {
    state.text = "✗ Invalid: wrong length (expected 13–19 digits)";
    if (typeof state.postError === "function") {
      state.postError("Card number has invalid length");
    }
    return;
  }

  // Luhn algorithm
  let sum = 0;
  let isEven = false;

  for (let i = number.length - 1; i >= 0; i--) {
    let digit = parseInt(number[i], 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    isEven = !isEven;
  }

  const isValid = sum % 10 === 0;

  // Detect card type
  let cardType = "Unknown";

  if (/^4/.test(number)) cardType = "Visa";
  else if (/^5[1-5]/.test(number)) cardType = "Mastercard";
  else if (/^3[47]/.test(number)) cardType = "American Express";
  else if (/^6(?:011|5)/.test(number)) cardType = "Discover";
  else if (/^3(?:0[0-5]|[68])/.test(number)) cardType = "Diners Club";
  else if (/^35(?:2[89]|[3-8])/.test(number)) cardType = "JCB";

  const masked = `${"*".repeat(number.length - 4)}${number.slice(-4)}`;
  const header = isValid
    ? "✓ Valid credit card number (Luhn check passed)"
    : "✗ Invalid credit card number (Luhn check failed)";

  state.text = `${header}

Type: ${cardType}
Length: ${number.length} digits
Masked: ${masked}`;

  if (typeof state.postInfo === "function") {
    if (isValid) {
      state.postInfo("Valid credit card number (Luhn)");
    } else {
      state.postInfo("Invalid credit card number (Luhn failed)");
    }
  }
}

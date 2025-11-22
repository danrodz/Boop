/**
  {
    "api": 1,
    "name": "Format Credit Card",
    "description": "Formats credit card number with spaces",
    "author": "Boop",
    "icon": "creditcard",
    "tags": "credit,card,format,number,payment"
  }
**/

function main(state) {
  var digits = state.text.replace(/\D/g, "");
  
  if (digits.length < 13 || digits.length > 19) {
    state.postError("Credit card numbers are typically 13-19 digits");
    return;
  }
  
  var formatted = digits.match(/.{1,4}/g).join(" ");
  
  var type = "Unknown";
  if (/^4/.test(digits)) type = "Visa";
  else if (/^5[1-5]/.test(digits)) type = "Mastercard";
  else if (/^3[47]/.test(digits)) type = "American Express";
  else if (/^6(?:011|5)/.test(digits)) type = "Discover";
  
  state.text = formatted;
  state.postInfo("Card type: " + type);
}

/**
  {
    "api": 1,
    "name": "Currency Formatter",
    "description": "Format numbers as currency (format: amount currency, e.g., '1234.56 USD')",
    "author": "Boop",
    "icon": "dollarsign.circle",
    "tags": "currency,money,format,dollar,euro"
  }
**/

function main(state) {
  try {
    const parts = state.text.trim().split(/\s+/);
    const amount = parseFloat(parts[0]);
    const currency = (parts[1] || 'USD').toUpperCase();

    if (isNaN(amount)) {
      state.postError("Invalid amount");
      return;
    }

    const symbols = {
      USD: '$',
      EUR: '€',
      GBP: '£',
      JPY: '¥',
      CNY: '¥',
      INR: '₹',
      AUD: 'A$',
      CAD: 'C$',
      CHF: 'CHF',
      BRL: 'R$',
      MXN: 'MX$'
    };

    const symbol = symbols[currency] || currency;

    // Format with thousands separator
    const formatted = amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

    const result = [
      `${symbol}${formatted}`,
      ``,
      `Amount: ${amount}`,
      `Currency: ${currency}`,
      `In cents: ${Math.round(amount * 100)}`,
      `Rounded: ${symbol}${Math.round(amount)}`
    ].join('\n');

    state.text = result;
  } catch (error) {
    state.postError("Error formatting currency: " + error.message);
  }
}

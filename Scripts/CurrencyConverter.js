/**
  {
    "api": 1,
    "name": "Currency Converter",
    "description": "Convert currency amounts (format: 100 USD to EUR)",
    "author": "Boop",
    "icon": "dollarsign.circle",
    "tags": "dollar,currency,convert"
  }
**/

function main(state) {
  const parts = state.text.trim().split(/\s+/);
  if (parts.length < 4) { state.postError("Format: 100 USD to EUR"); return; }
  
  const amount = parseFloat(parts[0]);
  const from = parts[1].toUpperCase();
  const to = parts[3].toUpperCase();
  
  const rates = { USD: 1, EUR: 0.92, GBP: 0.79, JPY: 149.50, CAD: 1.36, AUD: 1.53 };
  
  if (!rates[from] || !rates[to]) {
    state.text = "Supported currencies: USD, EUR, GBP, JPY, CAD, AUD\nNote: Rates are examples only";
    return;
  }
  
  const inUSD = amount / rates[from];
  const result = inUSD * rates[to];
  
  state.text = amount + " " + from + " = " + result.toFixed(2) + " " + to + "\n\n⚠️  Example rates only. Use live API for real conversion.";
}

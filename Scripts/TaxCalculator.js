/**
  {
    "api": 1,
    "name": "Tax Calculator",
    "description": "Calculate tax amount",
    "author": "Boop",
    "icon": "dollarsign.circle",
    "tags": "tax,calculate,finance"
  }
**/

function main(state) {
  const lines = state.text.trim().split('\n');
  if (lines.length < 2) { state.postError("Enter:\nAmount\nTax rate (%)"); return; }
  
  const amount = parseFloat(lines[0]);
  const taxRate = parseFloat(lines[1]);
  
  const tax = amount * (taxRate / 100);
  const total = amount + tax;
  
  state.text = "Amount: $" + amount.toFixed(2) + "\nTax (" + taxRate + "%): $" + tax.toFixed(2) + "\nTotal: $" + total.toFixed(2);
}

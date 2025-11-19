/**
  {
    "api": 1,
    "name": "Break-Even Calculator",
    "description": "Calculate break-even point",
    "author": "Boop",
    "icon": "dollarsign.circle",
    "tags": "breakeven,business,finance"
  }
**/

function main(state) {
  const lines = state.text.trim().split('\n');
  if (lines.length < 3) { state.postError("Enter:\nFixed costs\nPrice per unit\nVariable cost per unit"); return; }
  
  const fixed = parseFloat(lines[0]);
  const price = parseFloat(lines[1]);
  const variable = parseFloat(lines[2]);
  
  const breakEven = fixed / (price - variable);
  const revenue = breakEven * price;
  
  state.text = "Fixed Costs: $" + fixed.toFixed(2) + "\nPrice per Unit: $" + price.toFixed(2) + "\nVariable Cost: $" + variable.toFixed(2) + "\n\nBreak-Even Point: " + Math.ceil(breakEven) + " units\nBreak-Even Revenue: $" + revenue.toFixed(2);
}

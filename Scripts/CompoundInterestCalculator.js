/**
  {
    "api": 1,
    "name": "Compound Interest Calculator",
    "description": "Calculate compound interest",
    "author": "Boop",
    "icon": "dollarsign.circle",
    "tags": "interest,compound,finance"
  }
**/

function main(state) {
  const lines = state.text.trim().split('\n');
  if (lines.length < 4) { state.postError("Enter:\nPrincipal\nAnnual rate (%)\nYears\nCompounds per year"); return; }
  
  const principal = parseFloat(lines[0]);
  const rate = parseFloat(lines[1]) / 100;
  const years = parseFloat(lines[2]);
  const n = parseFloat(lines[3]);
  
  const amount = principal * Math.pow((1 + rate/n), n*years);
  const interest = amount - principal;
  
  state.text = "Principal: $" + principal.toFixed(2) + "\nFinal Amount: $" + amount.toFixed(2) + "\nInterest Earned: $" + interest.toFixed(2);
}

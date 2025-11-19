/**
  {
    "api": 1,
    "name": "Loan Payment Calculator",
    "description": "Calculate loan monthly payment",
    "author": "Boop",
    "icon": "dollarsign.circle",
    "tags": "loan,mortgage,finance"
  }
**/

function main(state) {
  const lines = state.text.trim().split('\n');
  if (lines.length < 3) { state.postError("Enter:\nPrincipal amount\nAnnual interest rate (%)\nLoan term (years)"); return; }
  
  const principal = parseFloat(lines[0]);
  const annualRate = parseFloat(lines[1]);
  const years = parseFloat(lines[2]);
  
  const monthlyRate = annualRate / 100 / 12;
  const numPayments = years * 12;
  
  const monthly = (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
  const total = monthly * numPayments;
  const totalInterest = total - principal;
  
  let result = "=== LOAN CALCULATION ===\n\n";
  result += "Principal: $" + principal.toLocaleString() + "\n";
  result += "Interest Rate: " + annualRate + "%\n";
  result += "Term: " + years + " years (" + numPayments + " months)\n\n";
  result += "Monthly Payment: $" + monthly.toFixed(2) + "\n";
  result += "Total Payment: $" + total.toFixed(2) + "\n";
  result += "Total Interest: $" + totalInterest.toFixed(2);
  
  state.text = result;
}

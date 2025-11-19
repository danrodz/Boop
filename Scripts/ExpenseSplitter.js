/**
  {
    "api": 1,
    "name": "Expense Splitter",
    "description": "Split expenses among people",
    "author": "Boop",
    "icon": "dollarsign.circle",
    "tags": "expense,split,share,bill"
  }
**/

function main(state) {
  const lines = state.text.trim().split('\n');
  if (lines.length < 2) { state.postError("Enter:\nTotal amount\nNumber of people"); return; }
  
  const total = parseFloat(lines[0]);
  const people = parseInt(lines[1]);
  
  const perPerson = total / people;
  
  let result = "Total: $" + total.toFixed(2) + "\n";
  result += "Split among: " + people + " people\n\n";
  result += "Per person: $" + perPerson.toFixed(2) + "\n\n";
  result += "Breakdown:\n";
  for (let i = 1; i <= people; i++) {
    result += "Person " + i + ": $" + perPerson.toFixed(2) + "\n";
  }
  
  state.text = result;
}

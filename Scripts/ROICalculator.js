/**
  {
    "api": 1,
    "name": "ROI Calculator",
    "description": "Calculate return on investment",
    "author": "Boop",
    "icon": "dollarsign.circle",
    "tags": "roi,investment,return"
  }
**/

function main(state) {
  const lines = state.text.trim().split('\n');
  if (lines.length < 2) { state.postError("Enter:\nInitial investment\nFinal value"); return; }
  
  const initial = parseFloat(lines[0]);
  const final = parseFloat(lines[1]);
  
  const gain = final - initial;
  const roi = (gain / initial) * 100;
  
  state.text = "Initial Investment: $" + initial.toFixed(2) + "\nFinal Value: $" + final.toFixed(2) + "\nGain/Loss: $" + gain.toFixed(2) + "\nROI: " + roi.toFixed(2) + "%";
}

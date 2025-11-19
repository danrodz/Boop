/**
  {
    "api": 1,
    "name": "Confusion Matrix Calculator",
    "description": "Calculate metrics from confusion matrix (format: TP,FP\nFN,TN)",
    "author": "Boop",
    "icon": "square.grid.2x2",
    "tags": "confusion,matrix,ml,metrics"
  }
**/
function main(state) {
  const lines = state.text.trim().split('\n');
  if (lines.length < 2) { state.postError("Format: TP,FP\nFN,TN"); return; }
  
  const row1 = lines[0].split(',').map(n => parseInt(n));
  const row2 = lines[1].split(',').map(n => parseInt(n));
  
  const TP = row1[0], FP = row1[1];
  const FN = row2[0], TN = row2[1];
  
  const accuracy = (TP + TN) / (TP + TN + FP + FN);
  const precision = TP / (TP + FP);
  const recall = TP / (TP + FN);
  const f1 = 2 * (precision * recall) / (precision + recall);
  
  state.text = "Confusion Matrix:\n  TP: " + TP + "  FP: " + FP + "\n  FN: " + FN + "  TN: " + TN + "\n\nAccuracy: " + (accuracy*100).toFixed(2) + "%\nPrecision: " + (precision*100).toFixed(2) + "%\nRecall: " + (recall*100).toFixed(2) + "%\nF1 Score: " + f1.toFixed(4);
}
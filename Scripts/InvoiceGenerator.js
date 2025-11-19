/**
  {
    "api": 1,
    "name": "Invoice Generator",
    "description": "Generate invoice template",
    "author": "Boop",
    "icon": "dollarsign.circle",
    "tags": "invoice,billing,template"
  }
**/

function main(state) {
  const invoiceNum = state.text.trim() || "INV-001";
  const date = new Date().toISOString().split('T')[0];
  
  let invoice = "INVOICE\n";
  invoice += "=".repeat(50) + "\n\n";
  invoice += "Invoice #: " + invoiceNum + "\n";
  invoice += "Date: " + date + "\n";
  invoice += "Due Date: [DUE DATE]\n\n";
  invoice += "Bill To:\n[CLIENT NAME]\n[ADDRESS]\n\n";
  invoice += "Items:\n" + "-".repeat(50) + "\n";
  invoice += "Description           Qty    Rate     Amount\n";
  invoice += "-".repeat(50) + "\n";
  invoice += "[ITEM 1]                1    $100.00  $100.00\n";
  invoice += "\n                           Subtotal: $100.00\n";
  invoice += "                                 Tax:  $0.00\n";
  invoice += "                              " + "=".repeat(15) + "\n";
  invoice += "                               Total: $100.00";
  
  state.text = invoice;
}

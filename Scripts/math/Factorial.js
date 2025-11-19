/**
  {
    "api": 1,
    "name": "Factorial",
    "description": "Calculates factorial of number",
    "author": "Boop",
    "icon": "function",
    "tags": "math,calculate,convert,numbers"
  }
**/

function main(state) {
  const n = parseInt(state.text.trim());
  if (n < 0) {
    state.postError('Factorial not defined for negative numbers');
    return;
  }
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  state.text = String(result);
}

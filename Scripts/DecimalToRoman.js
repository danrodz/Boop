/**
  {
    "api": 1,
    "name": "Decimal to Roman",
    "description": "Converts decimal numbers to Roman numerals",
    "author": "Boop",
    "icon": "number",
    "tags": "roman,numeral,decimal,convert,number"
  }
**/

function main(state) {
  const num = parseInt(state.text.trim());
  
  if (isNaN(num) || num < 1 || num > 3999) {
    state.postError("Enter a number between 1 and 3999");
    return;
  }
  
  const romanNumerals = [
    ['M', 1000], ['CM', 900], ['D', 500], ['CD', 400],
    ['C', 100], ['XC', 90], ['L', 50], ['XL', 40],
    ['X', 10], ['IX', 9], ['V', 5], ['IV', 4], ['I', 1]
  ];
  
  let result = '';
  let remaining = num;
  
  for (const [numeral, value] of romanNumerals) {
    while (remaining >= value) {
      result += numeral;
      remaining -= value;
    }
  }
  
  state.text = result;
  state.postInfo(`${num} = ${result}`);
}

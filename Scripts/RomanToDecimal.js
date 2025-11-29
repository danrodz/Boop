/**
  {
    "api": 1,
    "name": "Roman to Decimal",
    "description": "Converts Roman numerals to decimal numbers",
    "author": "Boop",
    "icon": "number",
    "tags": "roman,numeral,decimal,convert,number"
  }
**/

function main(state) {
  const roman = state.text.trim().toUpperCase();
  
  if (!/^[MDCLXVI]+$/i.test(roman)) {
    state.postError("Invalid Roman numeral");
    return;
  }
  
  const values = {
    'M': 1000, 'D': 500, 'C': 100,
    'L': 50, 'X': 10, 'V': 5, 'I': 1
  };
  
  let result = 0;
  let prev = 0;
  
  for (let i = roman.length - 1; i >= 0; i--) {
    const curr = values[roman[i]];
    if (curr < prev) {
      result -= curr;
    } else {
      result += curr;
    }
    prev = curr;
  }
  
  state.text = result.toString();
  state.postInfo(`${roman} = ${result}`);
}

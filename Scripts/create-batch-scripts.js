const fs = require('fs');
const path = require('path');

const mathScripts = [
  {name: "AddNumbers", desc: "Adds all numbers in text", calc: "sum"},
  {name: "MultiplyNumbers", desc: "Multiplies all numbers in text", calc: "product"},
  {name: "AverageNumbers", desc: "Calculates average of numbers in text", calc: "average"},
  {name: "MedianNumbers", desc: "Calculates median of numbers", calc: "median"},
  {name: "MinNumber", desc: "Finds minimum number in text", calc: "min"},
  {name: "MaxNumber", desc: "Finds maximum number in text", calc: "max"},
  {name: "SquareNumbers", desc: "Squares all numbers in text", calc: "square"},
  {name: "SquareRootNumbers", desc: "Square roots all numbers in text", calc: "sqrt"},
  {name: "AbsoluteValue", desc: "Converts numbers to absolute value", calc: "abs"},
  {name: "RoundNumbers", desc: "Rounds all numbers to nearest integer", calc: "round"}
];

// Create math scripts
for (let script of mathScripts) {
  const content = `/**
  {
    "api": 1,
    "name": "${script.name}",
    "description": "${script.desc}",
    "author": "Boop",
    "icon": "function",
    "tags": "math,numbers,calculate,${script.calc}"
  }
**/

function main(state) {
  const numbers = state.text.match(/-?\\d+\\.?\\d*/g);
  if (!numbers || numbers.length === 0) {
    state.postError("No numbers found in text");
    return;
  }

  const nums = numbers.map(Number);
  let result;

  switch("${script.calc}") {
    case "sum":
      result = nums.reduce((a, b) => a + b, 0);
      break;
    case "product":
      result = nums.reduce((a, b) => a * b, 1);
      break;
    case "average":
      result = nums.reduce((a, b) => a + b, 0) / nums.length;
      break;
    case "median":
      nums.sort((a, b) => a - b);
      result = nums.length % 2 ? nums[Math.floor(nums.length / 2)] : 
               (nums[nums.length / 2 - 1] + nums[nums.length / 2]) / 2;
      break;
    case "min":
      result = Math.min(...nums);
      break;
    case "max":
      result = Math.max(...nums);
      break;
    case "square":
      state.text = nums.map(n => n * n).join(', ');
      return;
    case "sqrt":
      state.text = nums.map(n => Math.sqrt(n)).join(', ');
      return;
    case "abs":
      state.text = nums.map(n => Math.abs(n)).join(', ');
      return;
    case "round":
      state.text = nums.map(n => Math.round(n)).join(', ');
      return;
  }

  state.text = String(result);
}
`;

  fs.writeFileSync(path.join('math', script.name + '.js'), content);
}

console.log(\`Created \${mathScripts.length} math scripts\`);

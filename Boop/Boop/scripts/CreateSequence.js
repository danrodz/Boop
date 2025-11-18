/**
  {
    "api": 1,
    "name": "Create Number Sequence",
    "description": "Creates a sequence of numbers from 1 to N (N = number of lines)",
    "author": "Boop",
    "icon": "list",
    "tags": "sequence,numbers,generate,list"
  }
**/

function main(state) {
  try {
    const lines = state.text.split("\n");
    const count = lines.length;
    const sequence = [];

    for (let i = 1; i <= count; i++) {
      sequence.push(String(i));
    }

    state.text = sequence.join("\n");
  } catch (error) {
    state.postError("Failed to create sequence");
  }
}

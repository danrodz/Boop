/**
  {
    "api": 1,
    "name": "Validate Email Format",
    "description": "Checks if email is valid format",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,transform,validation"
  }
**/

function main(state) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isValid = emailRegex.test(state.text.trim());
  state.text = isValid ? 'Valid email format' : 'Invalid email format';
}

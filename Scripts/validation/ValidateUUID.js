/**
  {
    "api": 1,
    "name": "Validate UUID",
    "description": "Checks if valid UUID format",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,transform,validation"
  }
**/

function main(state) {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  const isValid = uuidRegex.test(state.text.trim());
  state.text = isValid ? 'Valid UUID' : 'Invalid UUID';
}

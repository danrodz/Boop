/**
{
  "api": 1,
  "name": "Extract JSON Values",
  "description": "Extracts all values from JSON",
  "author": "Boop",
  "icon": "number",
  "tags": "json,values,extract"
}
**/

function main(state) {
  try {
    const obj = JSON.parse(state.text);
    const values = Object.values(obj).map(v =>
      typeof v === 'object' ? JSON.stringify(v) : String(v)
    );
    state.text = values.join('\n');
  } catch (e) {
    state.postError("Invalid JSON: " + e.message);
  }
}

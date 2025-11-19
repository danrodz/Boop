/**
  {
    "api": 1,
    "name": "Format Date (US)",
    "description": "Formats date as MM/DD/YYYY",
    "author": "Boop",
    "icon": "clock",
    "tags": "date,time,timestamp,convert,format"
  }
**/

function main(state) {
  const date = new Date(state.text.trim());
  const formatted = \`\${date.getMonth()+1}/\${date.getDate()}/\${date.getFullYear()}\`;
  state.text = formatted;
}

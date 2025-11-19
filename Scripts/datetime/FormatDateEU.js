/**
  {
    "api": 1,
    "name": "Format Date (EU)",
    "description": "Formats date as DD/MM/YYYY",
    "author": "Boop",
    "icon": "clock",
    "tags": "date,time,timestamp,convert,format"
  }
**/

function main(state) {
  const date = new Date(state.text.trim());
  const formatted = \`\${date.getDate()}/\${date.getMonth()+1}/\${date.getFullYear()}\`;
  state.text = formatted;
}

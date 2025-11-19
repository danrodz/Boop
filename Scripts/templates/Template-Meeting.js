/**
  {
    "api": 1,
    "name": "Meeting Notes Template",
    "description": "Creates meeting notes template",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,quick,insert"
  }
**/

function main(state) {
  const date = new Date().toLocaleDateString();
  state.insert(\`Meeting Notes - \${date}\n\nAttendees:\n- \n\nAgenda:\n1. \n\nNotes:\n\n\nAction Items:\n- \`);
}

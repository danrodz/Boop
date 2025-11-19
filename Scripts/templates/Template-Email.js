/**
  {
    "api": 1,
    "name": "Email Template",
    "description": "Creates email template",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,quick,insert"
  }
**/

function main(state) {
  state.insert(\`To: \nFrom: \nSubject: \n\n\`);
}

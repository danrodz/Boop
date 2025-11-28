/**
  {
    "api": 1,
    "name": "Parse Terraform Plan",
    "description": "Extract summary from Terraform plan output",
    "author": "Boop",
    "icon": "info",
    "tags": "terraform,parse,devops,infrastructure"
  }
**/

function main(state) {
  const plan = state.text;

  const summary = {
    toAdd: 0,
    toChange: 0,
    toDestroy: 0,
    resources: []
  };

  // Count changes
  const addMatch = plan.match(/(\d+)\s+to\s+add/);
  const changeMatch = plan.match(/(\d+)\s+to\s+change/);
  const destroyMatch = plan.match(/(\d+)\s+to\s+destroy/);

  if (addMatch) summary.toAdd = parseInt(addMatch[1]);
  if (changeMatch) summary.toChange = parseInt(changeMatch[1]);
  if (destroyMatch) summary.toDestroy = parseInt(destroyMatch[1]);

  // Extract resource changes
  const resourceRegex = /[+~-]\s+(\S+)/g;
  let match;
  while ((match = resourceRegex.exec(plan)) !== null) {
    summary.resources.push(match[1]);
  }

  let output = `Terraform Plan Summary:
- Resources to add: ${summary.toAdd}
- Resources to change: ${summary.toChange}
- Resources to destroy: ${summary.toDestroy}
- Total changes: ${summary.toAdd + summary.toChange + summary.toDestroy}`;

  if (summary.resources.length > 0 && summary.resources.length <= 10) {
    output += '\n\nAffected resources:\n' + summary.resources.map(r => `- ${r}`).join('\n');
  }

  state.text = output;
  state.postInfo("Parsed Terraform plan");
}

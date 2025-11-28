/**
  {
    "api": 1,
    "name": "Generate Git Branch Name",
    "description": "Generate a well-formatted git branch name from description",
    "author": "Boop",
    "icon": "branch",
    "tags": "git,branch,name,format"
  }
**/

function main(state) {
  const description = state.text.trim();

  if (!description) {
    state.postError("Enter a description (e.g., 'Fix login bug')");
    return;
  }

  // Detect type from description
  let type = 'feature';
  if (/fix|bug|issue/i.test(description)) type = 'fix';
  else if (/doc|readme/i.test(description)) type = 'docs';
  else if (/refactor/i.test(description)) type = 'refactor';
  else if (/test/i.test(description)) type = 'test';
  else if (/chore|update/i.test(description)) type = 'chore';

  // Clean and format
  let branchName = description
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 50);

  // Add type prefix
  branchName = `${type}/${branchName}`;

  const alternatives = [
    branchName,
    `${type}/${branchName.split('/')[1].substring(0, 30)}`,
    `feature/${branchName.split('/')[1]}`,
    branchName.replace(/^[^\/]+\//, '')
  ];

  let output = `Suggested branch names:\n\n`;
  output += `Primary: ${alternatives[0]}\n\n`;
  output += `Alternatives:\n`;
  alternatives.slice(1).forEach((alt, i) => {
    output += `${i + 1}. ${alt}\n`;
  });

  output += `\nGit command:\ngit checkout -b ${alternatives[0]}`;

  state.text = output;
  state.postInfo("Generated branch name");
}

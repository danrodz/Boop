/**
  {
    "api": 1,
    "name": "Validate GCP Project ID",
    "description": "Validate Google Cloud Platform project ID format",
    "author": "Boop",
    "icon": "cloud",
    "tags": "gcp,google,cloud,validate"
  }
**/

function main(state) {
  const projectId = state.text.trim();

  const rules = [
    {
      test: projectId.length >= 6 && projectId.length <= 30,
      message: 'Length must be 6-30 characters'
    },
    {
      test: /^[a-z]/.test(projectId),
      message: 'Must start with a lowercase letter'
    },
    {
      test: /^[a-z][a-z0-9-]*$/.test(projectId),
      message: 'Can only contain lowercase letters, numbers, and hyphens'
    },
    {
      test: !/--/.test(projectId),
      message: 'Cannot contain consecutive hyphens'
    },
    {
      test: !/^[a-z][a-z0-9-]*[a-z0-9]$/.test(projectId) || projectId.length === 1,
      message: 'Cannot end with a hyphen'
    }
  ];

  const failures = rules.filter(rule => !rule.test);

  let output = `GCP Project ID: ${projectId}\n\n`;

  if (failures.length === 0) {
    output += '✓ Valid GCP project ID format\n\n';
    output += 'Create project:\ngcloud projects create ' + projectId;
  } else {
    output += '✗ Invalid GCP project ID\n\nIssues:\n';
    failures.forEach(failure => {
      output += `- ${failure.message}\n`;
    });

    output += '\nRequirements:\n';
    output += '- 6-30 characters long\n';
    output += '- Start with a lowercase letter\n';
    output += '- Only lowercase letters, numbers, and hyphens\n';
    output += '- No consecutive hyphens\n';
    output += '- Cannot end with hyphen\n';
  }

  state.text = output;
}

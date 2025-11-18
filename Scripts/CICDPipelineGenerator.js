/**
  {
    "api": 1,
    "name": "CI/CD Pipeline Generator",
    "description": "Generate GitHub Actions workflow",
    "author": "Boop",
    "icon": "arrow.triangle.2.circlepath",
    "tags": "cicd,github,actions,workflow"
  }
**/

function main(state) {
  const lang = state.text.trim().toLowerCase() || 'node';
  let yaml = 'name: CI\non: [push]\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v2\n';
  if (lang === 'node') yaml += '      - uses: actions/setup-node@v2\n      - run: npm install\n      - run: npm test';
  else if (lang === 'python') yaml += '      - uses: actions/setup-python@v2\n      - run: pip install -r requirements.txt\n      - run: pytest';
  state.text = yaml;
}

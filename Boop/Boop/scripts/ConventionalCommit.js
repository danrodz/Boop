/**
	{
		"api":1,
		"name":"Conventional Commit",
		"description":"Formats git commit messages following Conventional Commits specification",
		"author":"Boop",
		"icon":"git",
		"tags":"git,commit,conventional,format,semver"
	}
**/

function main(state) {
	const text = state.text.trim();

	// If already formatted, validate it
	const conventionalPattern = /^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\(.+\))?!?:\s.+/;

	if (conventionalPattern.test(text)) {
		state.postInfo("✓ Already a valid Conventional Commit");
		return;
	}

	// Interactive formatter
	const types = [
		'feat:     A new feature',
		'fix:      A bug fix',
		'docs:     Documentation only changes',
		'style:    Code style changes (formatting, etc)',
		'refactor: Code change that neither fixes a bug nor adds a feature',
		'perf:     Performance improvement',
		'test:     Adding or updating tests',
		'build:    Changes to build system or dependencies',
		'ci:       Changes to CI configuration',
		'chore:    Other changes that don\'t modify src or test files',
		'revert:   Reverts a previous commit'
	];

	const guide = `Conventional Commit Format:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
<type>(<scope>): <description>

[optional body]

[optional footer]

Types:
${types.join('\n')}

Examples:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
feat(auth): add OAuth2 login support
fix(api): resolve null pointer in user endpoint
docs: update README with installation steps
perf(db): optimize query performance for large datasets

Breaking Changes (add !):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
feat!: drop support for Node 12
fix(api)!: change response format to match spec

Your message:
${text}

Suggested format:
<type>: ${text}`;

	state.text = guide;
}

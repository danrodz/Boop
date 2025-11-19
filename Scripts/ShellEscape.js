/**
  {
    "api": 1,
    "name": "Encode for Shell/Bash",
    "description": "Escapes text for safe use in shell commands",
    "author": "Boop",
    "icon": "terminal.fill",
    "tags": "shell,bash,escape,quote,command"
  }
**/

function main(state) {
  const text = state.text;

  // Escape single quotes by replacing ' with '\''
  const singleQuoted = "'" + text.replace(/'/g, "'\\''") + "'";

  // Escape for double quotes
  const doubleQuoted = '"' + text
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/`/g, '\\`')
    .replace(/\$/g, '\\$')
    .replace(/!/g, '\\!') + '"';

  const result = `SHELL ESCAPING

Single-quoted (recommended):
${singleQuoted}

Double-quoted:
${doubleQuoted}

Example usage:
echo ${singleQuoted}
grep ${singleQuoted} file.txt`;

  state.text = result;
}

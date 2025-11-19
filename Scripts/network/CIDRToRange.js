/**
  {
    "api": 1,
    "name": "CIDR to IP Range (simple)",
    "description": "Shows CIDR info",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,format,convert"
  }
**/

function main(state) {
  const [ip, bits] = state.text.trim().split('/');
  const hosts = Math.pow(2, 32 - parseInt(bits)) - 2;
  state.text = \`CIDR: \${state.text}\nApprox usable hosts: \${hosts}\`;
}

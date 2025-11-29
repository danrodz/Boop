/**
  {
    "api": 1,
    "name": "Check Password Breach (Info)",
    "description": "Generate info about checking passwords against breach databases",
    "author": "Boop",
    "icon": "info",
    "tags": "password,security,breach,hibp"
  }
**/

function main(state) {
  const info = `Password Breach Check

To safely check if a password has been compromised:

1. Visit: https://haveibeenpwned.com/Passwords

2. Or use the k-anonymity API:
   - The API only sends the first 5 characters of the SHA-1 hash
   - Your full password never leaves your device

3. Command line (pwned-passwords-cli):
   npm install -g pwned-passwords-cli
   pwned-passwords check

⚠️  IMPORTANT:
- Never paste passwords into untrusted websites
- Use the official haveibeenpwned.com site
- Consider using a password manager with breach checking

Password entered: ${state.text.length} characters
(Not checked for security reasons - use official tools)`;

  state.text = info;
  state.postInfo("Generated breach check info");
}

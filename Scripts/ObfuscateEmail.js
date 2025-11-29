/**
  {
    "api": 1,
    "name": "Obfuscate Email",
    "description": "Obfuscate email address to prevent scraping",
    "author": "Boop",
    "icon": "mail",
    "tags": "email,obfuscate,security,privacy"
  }
**/

function main(state) {
  const email = state.text.trim();

  if (!email.includes('@')) {
    state.postError("Invalid email address");
    return;
  }

  const methods = {
    'HTML Entities': email.split('').map(char => {
      return `&#${char.charCodeAt(0)};`;
    }).join(''),

    'AT/DOT Replacement': email.replace('@', ' [at] ').replace(/\./g, ' [dot] '),

    'JavaScript': `<script>document.write('${email.split('').reverse().join('')}'.split('').reverse().join(''));</script>`,

    'CSS Direction': `<span style="unicode-bidi: bidi-override; direction: rtl;">${email.split('').reverse().join('')}</span>`,

    'Mailto Encoded': 'mailto:' + email.split('').map(char => {
      return '%' + char.charCodeAt(0).toString(16).toUpperCase();
    }).join('')
  };

  let result = 'Email Obfuscation Methods:\n\n';
  for (const [method, obfuscated] of Object.entries(methods)) {
    result += `${method}:\n${obfuscated}\n\n`;
  }

  state.text = result;
  state.postInfo("Generated obfuscation methods");
}

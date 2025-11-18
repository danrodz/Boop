/**
  {
    "api": 1,
    "name": "CSRF Token Generator",
    "description": "Generate CSRF protection token",
    "author": "Boop",
    "icon": "shield.checkered",
    "tags": "csrf,token,security,generate"
  }
**/
function main(state) {
  const length = parseInt(state.text) || 32;
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < length; i++) token += chars[Math.floor(Math.random() * chars.length)];
  state.text = 'CSRF Token:\n' + token + '\n\nHTML: <input type="hidden" name="csrf_token" value="' + token + '">';
}

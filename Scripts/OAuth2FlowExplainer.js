/**
  {
    "api": 1,
    "name": "OAuth 2.0 Flow Explainer",
    "description": "Explain OAuth 2.0 authorization flows",
    "author": "Boop",
    "icon": "key.viewfinder",
    "tags": "oauth,oauth2,auth,flow,explain"
  }
**/
function main(state) {
  const flow = state.text.trim().toLowerCase() || 'authorization_code';
  const flows = {
    authorization_code: 'Most secure - for server-side apps\nSteps: User login → Code → Exchange for token',
    implicit: 'For SPAs (deprecated)\nSteps: User login → Token in URL',
    client_credentials: 'Machine-to-machine\nSteps: Client auth → Token',
    password: 'Direct credentials (not recommended)\nSteps: Username/password → Token'
  };
  state.text = flows[flow] || 'Unknown flow\n\nAvailable: authorization_code, implicit, client_credentials, password';
}

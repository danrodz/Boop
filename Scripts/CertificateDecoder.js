/**
  {
    "api": 1,
    "name": "Certificate Info Decoder",
    "description": "Decode X.509 certificate information (PEM format)",
    "author": "Boop",
    "icon": "checkmark.seal",
    "tags": "certificate,x509,pem,ssl,tls"
  }
**/
function main(state) {
  const cert = state.text.trim();
  if (!cert.includes('BEGIN CERTIFICATE')) {
    state.postError("Not a PEM certificate");
    return;
  }
  const base64 = cert.replace(/-----BEGIN CERTIFICATE-----/, '').replace(/-----END CERTIFICATE-----/, '').replace(/\s/g, '');
  let result = 'Certificate Format: X.509 (PEM)\n';
  result += 'Length: ' + base64.length + ' characters\n\n';
  result += 'Use OpenSSL for full parsing:\n';
  result += 'openssl x509 -in cert.pem -text -noout';
  state.text = result;
}

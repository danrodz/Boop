/**
	{
		"api":1,
		"name":"Decode JWT Token",
		"description":"Decodes and displays JWT token header and payload (without verification)",
		"author":"Boop",
		"icon":"key",
		"tags":"jwt,token,decode,json,auth,authentication"
	}
**/

function main(state) {
	try {
		const token = state.text.trim();
		const parts = token.split('.');

		if (parts.length !== 3) {
			state.postError("Invalid JWT format. Expected: header.payload.signature");
			return;
		}

		// Base64 URL decode
		const base64UrlDecode = (str) => {
			// Replace URL-safe chars
			str = str.replace(/-/g, '+').replace(/_/g, '/');
			// Pad if necessary
			while (str.length % 4) str += '=';
			return atob(str);
		};

		const header = JSON.parse(base64UrlDecode(parts[0]));
		const payload = JSON.parse(base64UrlDecode(parts[1]));

		// Format timestamps
		let payloadInfo = '';
		if (payload.exp) {
			const expDate = new Date(payload.exp * 1000);
			const now = new Date();
			const expired = expDate < now;
			payloadInfo += `\nExpires: ${expDate.toISOString()} ${expired ? '(EXPIRED)' : '(Valid)'}`;
		}
		if (payload.iat) {
			payloadInfo += `\nIssued: ${new Date(payload.iat * 1000).toISOString()}`;
		}
		if (payload.nbf) {
			payloadInfo += `\nNot Before: ${new Date(payload.nbf * 1000).toISOString()}`;
		}

		const result = `JWT Token Decoded:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

HEADER:
${JSON.stringify(header, null, 2)}

PAYLOAD:
${JSON.stringify(payload, null, 2)}${payloadInfo}

SIGNATURE:
${parts[2]}

⚠️  WARNING:
This only DECODES the token.
The signature is NOT verified.
Do not trust unverified tokens!

Verify at: https://jwt.io`;

		state.text = result;
	}
	catch(error) {
		state.postError("Failed to decode JWT: " + error.message);
	}
}

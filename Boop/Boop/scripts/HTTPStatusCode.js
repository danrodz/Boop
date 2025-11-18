/**
	{
		"api":1,
		"name":"HTTP Status Code Lookup",
		"description":"Looks up HTTP status code descriptions and use cases",
		"author":"Boop",
		"icon":"info",
		"tags":"http,status,code,api,rest"
	}
**/

function main(state) {
	const code = parseInt(state.text.trim());

	const codes = {
		// 1xx Informational
		100: ['Continue', 'The client should continue the request'],
		101: ['Switching Protocols', 'Server is switching protocols as requested'],

		// 2xx Success
		200: ['OK', 'Standard successful response'],
		201: ['Created', 'Resource successfully created'],
		202: ['Accepted', 'Request accepted for processing'],
		204: ['No Content', 'Success but no content to return'],
		206: ['Partial Content', 'Partial GET request successful'],

		// 3xx Redirection
		301: ['Moved Permanently', 'Resource permanently moved to new URL'],
		302: ['Found', 'Resource temporarily moved'],
		304: ['Not Modified', 'Resource not modified since last request'],
		307: ['Temporary Redirect', 'Temporary redirect (keep method)'],
		308: ['Permanent Redirect', 'Permanent redirect (keep method)'],

		// 4xx Client Errors
		400: ['Bad Request', 'Invalid request syntax'],
		401: ['Unauthorized', 'Authentication required'],
		403: ['Forbidden', 'Server refuses to fulfill request'],
		404: ['Not Found', 'Resource not found'],
		405: ['Method Not Allowed', 'HTTP method not allowed for resource'],
		408: ['Request Timeout', 'Server timed out waiting for request'],
		409: ['Conflict', 'Request conflicts with current state'],
		410: ['Gone', 'Resource permanently deleted'],
		415: ['Unsupported Media Type', 'Media type not supported'],
		422: ['Unprocessable Entity', 'Request well-formed but semantically incorrect'],
		429: ['Too Many Requests', 'Rate limit exceeded'],

		// 5xx Server Errors
		500: ['Internal Server Error', 'Generic server error'],
		501: ['Not Implemented', 'Server does not support functionality'],
		502: ['Bad Gateway', 'Invalid response from upstream server'],
		503: ['Service Unavailable', 'Server temporarily unavailable'],
		504: ['Gateway Timeout', 'Upstream server timeout'],
	};

	if (codes[code]) {
		const [name, description] = codes[code];
		const category = code < 200 ? 'Informational' :
		                 code < 300 ? 'Success' :
		                 code < 400 ? 'Redirection' :
		                 code < 500 ? 'Client Error' : 'Server Error';

		const result = `HTTP ${code} ${name}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Category:    ${category}
Description: ${description}

Common use cases:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${getUseCases(code)}

HTTP Status Code Ranges:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1xx: Informational responses
2xx: Successful responses
3xx: Redirection messages
4xx: Client error responses
5xx: Server error responses`;

		state.text = result;
	} else {
		state.postError(`Unknown HTTP status code: ${code}`);
	}
}

function getUseCases(code) {
	const cases = {
		200: '• Successful GET request\n• Successful POST with response data',
		201: '• Resource created via POST\n• File uploaded successfully',
		204: '• Successful DELETE request\n• Successful PUT with no response',
		400: '• Invalid JSON in request\n• Missing required parameters',
		401: '• Missing authentication token\n• Invalid credentials',
		403: '• Valid token but insufficient permissions\n• IP address blocked',
		404: '• Resource ID doesn\'t exist\n• Endpoint not found',
		422: '• Validation errors\n• Business logic constraints violated',
		429: '• API rate limit exceeded\n• Too many login attempts',
		500: '• Unhandled exception\n• Database connection failed',
		503: '• Server maintenance\n• Database temporarily unavailable'
	};
	return cases[code] || '• General ' + (code < 500 ? 'client' : 'server') + ' error handling';
}

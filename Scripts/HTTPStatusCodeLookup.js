/**
  {
    "api": 1,
    "name": "HTTP Status Code Lookup",
    "description": "Look up HTTP status code meaning",
    "author": "Boop",
    "icon": "info",
    "tags": "http,status,code,lookup,api"
  }
**/

function main(state) {
  const statusCodes = {
    200: 'OK',
    201: 'Created',
    204: 'No Content',
    301: 'Moved Permanently',
    302: 'Found',
    304: 'Not Modified',
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    405: 'Method Not Allowed',
    409: 'Conflict',
    422: 'Unprocessable Entity',
    429: 'Too Many Requests',
    500: 'Internal Server Error',
    502: 'Bad Gateway',
    503: 'Service Unavailable',
    504: 'Gateway Timeout'
  };

  const code = parseInt(state.text.trim());

  if (statusCodes[code]) {
    state.text = `${code} - ${statusCodes[code]}`;
    state.postInfo("Status code found");
  } else if (code >= 100 && code < 600) {
    const category = Math.floor(code / 100);
    const categories = {
      1: 'Informational',
      2: 'Success',
      3: 'Redirection',
      4: 'Client Error',
      5: 'Server Error'
    };
    state.text = `${code} - ${categories[category]} (specific meaning not in database)`;
  } else {
    state.postError("Invalid HTTP status code");
  }
}

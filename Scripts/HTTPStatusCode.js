/**
  {
    "api": 1,
    "name": "HTTP Status Code Info",
    "description": "Shows information about HTTP status codes",
    "author": "Boop",
    "icon": "network",
    "tags": "http,status,code,info,error"
  }
**/

function main(state) {
  const statusCodes = {
    // 1xx Informational
    100: 'Continue',
    101: 'Switching Protocols',
    102: 'Processing',
    103: 'Early Hints',

    // 2xx Success
    200: 'OK',
    201: 'Created',
    202: 'Accepted',
    203: 'Non-Authoritative Information',
    204: 'No Content',
    205: 'Reset Content',
    206: 'Partial Content',

    // 3xx Redirection
    300: 'Multiple Choices',
    301: 'Moved Permanently',
    302: 'Found',
    303: 'See Other',
    304: 'Not Modified',
    307: 'Temporary Redirect',
    308: 'Permanent Redirect',

    // 4xx Client Error
    400: 'Bad Request',
    401: 'Unauthorized',
    402: 'Payment Required',
    403: 'Forbidden',
    404: 'Not Found',
    405: 'Method Not Allowed',
    406: 'Not Acceptable',
    408: 'Request Timeout',
    409: 'Conflict',
    410: 'Gone',
    413: 'Payload Too Large',
    414: 'URI Too Long',
    415: 'Unsupported Media Type',
    418: "I'm a teapot",
    422: 'Unprocessable Entity',
    429: 'Too Many Requests',

    // 5xx Server Error
    500: 'Internal Server Error',
    501: 'Not Implemented',
    502: 'Bad Gateway',
    503: 'Service Unavailable',
    504: 'Gateway Timeout',
    505: 'HTTP Version Not Supported'
  };

  const code = parseInt(state.text.trim());

  if (isNaN(code) || code < 100 || code > 599) {
    state.postError("Invalid HTTP status code (100-599)");
    return;
  }

  const message = statusCodes[code] || 'Unknown';

  let category;
  if (code < 200) category = 'Informational';
  else if (code < 300) category = 'Success';
  else if (code < 400) category = 'Redirection';
  else if (code < 500) category = 'Client Error';
  else category = 'Server Error';

  const result = `HTTP STATUS CODE

Code: ${code}
Message: ${message}
Category: ${category}`;

  state.text = result;
}

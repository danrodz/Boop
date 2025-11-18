/**
  {
    "api": 1,
    "name": "HTTP Status Code Explainer",
    "description": "Explain HTTP status codes",
    "author": "Boop",
    "icon": "network",
    "tags": "http,status,code,explain"
  }
**/

function main(state) {
  try {
    const code = parseInt(state.text.trim());

    const statusCodes = {
      // 1xx Informational
      100: 'Continue - Client should continue request',
      101: 'Switching Protocols - Server is switching protocols',

      // 2xx Success
      200: 'OK - Request succeeded',
      201: 'Created - Resource created successfully',
      202: 'Accepted - Request accepted for processing',
      204: 'No Content - Success but no content to return',

      // 3xx Redirection
      301: 'Moved Permanently - Resource moved permanently',
      302: 'Found - Resource temporarily moved',
      304: 'Not Modified - Cached version is still valid',
      307: 'Temporary Redirect - Temporary redirect, preserve method',
      308: 'Permanent Redirect - Permanent redirect, preserve method',

      // 4xx Client Errors
      400: 'Bad Request - Invalid request syntax',
      401: 'Unauthorized - Authentication required',
      403: 'Forbidden - Server refuses to fulfill request',
      404: 'Not Found - Resource not found',
      405: 'Method Not Allowed - HTTP method not supported',
      408: 'Request Timeout - Request took too long',
      409: 'Conflict - Request conflicts with current state',
      410: 'Gone - Resource permanently removed',
      413: 'Payload Too Large - Request entity too large',
      414: 'URI Too Long - URI exceeds server limit',
      415: 'Unsupported Media Type - Media type not supported',
      429: 'Too Many Requests - Rate limit exceeded',

      // 5xx Server Errors
      500: 'Internal Server Error - Generic server error',
      501: 'Not Implemented - Server does not support functionality',
      502: 'Bad Gateway - Invalid response from upstream server',
      503: 'Service Unavailable - Server temporarily unavailable',
      504: 'Gateway Timeout - Upstream server timeout',
      505: 'HTTP Version Not Supported - HTTP version not supported',
    };

    const description = statusCodes[code];

    if (description) {
      const category = Math.floor(code / 100);
      const categories = {
        1: 'Informational',
        2: 'Success',
        3: 'Redirection',
        4: 'Client Error',
        5: 'Server Error'
      };

      let result = `HTTP ${code}\n`;
      result += `Category: ${categories[category]}\n\n`;
      result += `${description}\n\n`;

      // Add common solutions
      if (code >= 400 && code < 500) {
        result += 'Common solutions:\n';
        if (code === 404) result += '- Check URL spelling\n- Verify resource exists';
        else if (code === 401) result += '- Provide authentication\n- Check credentials';
        else if (code === 403) result += '- Check permissions\n- Verify authorization';
        else if (code === 429) result += '- Reduce request rate\n- Implement backoff';
      } else if (code >= 500) {
        result += 'Common causes:\n';
        result += '- Server configuration error\n';
        result += '- Application bug\n';
        result += '- Resource exhaustion';
      }

      state.text = result;
    } else {
      state.text = `HTTP ${code}\n\nNo description available for this status code`;
    }
  } catch (error) {
    state.postError("Invalid status code");
  }
}

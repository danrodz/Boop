/**
  {
    "api": 1,
    "name": "User Agent Parser",
    "description": "Parse and analyze HTTP User-Agent string",
    "author": "Boop",
    "icon": "desktopcomputer",
    "tags": "useragent,browser,parse,http"
  }
**/

function main(state) {
  try {
    const ua = state.text.trim();

    let result = 'User Agent Analysis:\n\n';

    // Detect browser
    let browser = 'Unknown';
    if (ua.includes('Firefox/')) browser = 'Firefox ' + ua.match(/Firefox\/([0-9.]+)/)?.[1];
    else if (ua.includes('Chrome/')) browser = 'Chrome ' + ua.match(/Chrome\/([0-9.]+)/)?.[1];
    else if (ua.includes('Safari/') && !ua.includes('Chrome')) browser = 'Safari ' + ua.match(/Version\/([0-9.]+)/)?.[1];
    else if (ua.includes('Edge/')) browser = 'Edge ' + ua.match(/Edge\/([0-9.]+)/)?.[1];
    else if (ua.includes('MSIE')) browser = 'Internet Explorer ' + ua.match(/MSIE ([0-9.]+)/)?.[1];

    result += `Browser: ${browser}\n`;

    // Detect OS
    let os = 'Unknown';
    if (ua.includes('Windows NT 10.0')) os = 'Windows 10';
    else if (ua.includes('Windows NT 6.3')) os = 'Windows 8.1';
    else if (ua.includes('Windows NT 6.2')) os = 'Windows 8';
    else if (ua.includes('Windows NT 6.1')) os = 'Windows 7';
    else if (ua.includes('Mac OS X')) os = 'macOS ' + ua.match(/Mac OS X ([0-9_]+)/)?.[1]?.replace(/_/g, '.');
    else if (ua.includes('Linux')) os = 'Linux';
    else if (ua.includes('Android')) os = 'Android ' + ua.match(/Android ([0-9.]+)/)?.[1];
    else if (ua.includes('iPhone')) os = 'iOS ' + ua.match(/OS ([0-9_]+)/)?.[1]?.replace(/_/g, '.');

    result += `Operating System: ${os}\n`;

    // Detect device type
    let device = 'Desktop';
    if (ua.includes('Mobile') || ua.includes('Android')) device = 'Mobile';
    else if (ua.includes('Tablet') || ua.includes('iPad')) device = 'Tablet';

    result += `Device Type: ${device}\n`;

    // Bot detection
    const bots = ['bot', 'crawler', 'spider', 'scraper', 'googlebot', 'bingbot'];
    const isBot = bots.some(bot => ua.toLowerCase().includes(bot));

    result += `Is Bot: ${isBot ? 'Yes' : 'No'}`;

    state.text = result;
  } catch (error) {
    state.postError("Failed to parse user agent: " + error.message);
  }
}

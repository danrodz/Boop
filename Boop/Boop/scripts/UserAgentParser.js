/**
  {
    "api": 1,
    "name": "User Agent Parser",
    "description": "Parse and analyze User-Agent strings",
    "author": "Boop",
    "icon": "desktopcomputer",
    "tags": "useragent,browser,parse,http"
  }
**/

function main(state) {
  try {
    const ua = state.text.trim();

    // Extract browser
    let browser = 'Unknown';
    if (ua.includes('Firefox/')) {
      browser = 'Firefox ' + ua.split('Firefox/')[1].split(' ')[0];
    } else if (ua.includes('Edg/')) {
      browser = 'Edge ' + ua.split('Edg/')[1].split(' ')[0];
    } else if (ua.includes('Chrome/')) {
      browser = 'Chrome ' + ua.split('Chrome/')[1].split(' ')[0];
    } else if (ua.includes('Safari/') && !ua.includes('Chrome')) {
      browser = 'Safari ' + ua.split('Version/')[1].split(' ')[0];
    }

    // Extract OS
    let os = 'Unknown';
    if (ua.includes('Windows NT 10')) os = 'Windows 10/11';
    else if (ua.includes('Windows NT 6.3')) os = 'Windows 8.1';
    else if (ua.includes('Windows NT 6.2')) os = 'Windows 8';
    else if (ua.includes('Windows NT 6.1')) os = 'Windows 7';
    else if (ua.includes('Mac OS X')) {
      const match = ua.match(/Mac OS X ([\d_]+)/);
      os = match ? 'macOS ' + match[1].replace(/_/g, '.') : 'macOS';
    } else if (ua.includes('Linux')) os = 'Linux';
    else if (ua.includes('Android')) {
      const match = ua.match(/Android ([\d.]+)/);
      os = match ? 'Android ' + match[1] : 'Android';
    } else if (ua.includes('iOS') || ua.includes('iPhone')) {
      const match = ua.match(/OS ([\d_]+)/);
      os = match ? 'iOS ' + match[1].replace(/_/g, '.') : 'iOS';
    }

    // Detect device type
    let device = 'Desktop';
    if (ua.includes('Mobile') || ua.includes('Android')) device = 'Mobile';
    else if (ua.includes('Tablet') || ua.includes('iPad')) device = 'Tablet';

    const result = [
      'User Agent Analysis:',
      '',
      `Browser: ${browser}`,
      `Operating System: ${os}`,
      `Device Type: ${device}`,
      '',
      'Full User Agent:',
      ua
    ].join('\n');

    state.text = result;
  } catch (error) {
    state.postError("Error parsing User-Agent: " + error.message);
  }
}

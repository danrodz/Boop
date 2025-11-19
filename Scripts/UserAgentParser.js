/**
  {
    "api": 1,
    "name": "User Agent Parser",
    "description": "Parses and explains User-Agent strings",
    "author": "Boop",
    "icon": "globe",
    "tags": "user-agent,parse,browser,detect"
  }
**/

function main(state) {
  const ua = state.text.trim();

  // Detect browser
  let browser = 'Unknown';
  let version = '';

  if (ua.includes('Firefox/')) {
    browser = 'Firefox';
    version = ua.match(/Firefox\/([\d.]+)/)?.[1] || '';
  } else if (ua.includes('Edg/')) {
    browser = 'Microsoft Edge';
    version = ua.match(/Edg\/([\d.]+)/)?.[1] || '';
  } else if (ua.includes('Chrome/')) {
    browser = 'Chrome';
    version = ua.match(/Chrome\/([\d.]+)/)?.[1] || '';
  } else if (ua.includes('Safari/') && !ua.includes('Chrome')) {
    browser = 'Safari';
    version = ua.match(/Version\/([\d.]+)/)?.[1] || '';
  } else if (ua.includes('MSIE') || ua.includes('Trident/')) {
    browser = 'Internet Explorer';
    version = ua.match(/(?:MSIE |rv:)([\d.]+)/)?.[1] || '';
  }

  // Detect OS
  let os = 'Unknown';

  if (ua.includes('Windows NT 10.0')) os = 'Windows 10/11';
  else if (ua.includes('Windows NT 6.3')) os = 'Windows 8.1';
  else if (ua.includes('Windows NT 6.2')) os = 'Windows 8';
  else if (ua.includes('Windows NT 6.1')) os = 'Windows 7';
  else if (ua.includes('Windows')) os = 'Windows';
  else if (ua.includes('Mac OS X')) {
    const macVersion = ua.match(/Mac OS X ([\d_]+)/)?.[1].replace(/_/g, '.');
    os = macVersion ? `macOS ${macVersion}` : 'macOS';
  } else if (ua.includes('Linux')) os = 'Linux';
  else if (ua.includes('Android')) {
    const androidVersion = ua.match(/Android ([\d.]+)/)?.[1];
    os = androidVersion ? `Android ${androidVersion}` : 'Android';
  } else if (ua.includes('iOS') || ua.includes('iPhone') || ua.includes('iPad')) {
    const iosVersion = ua.match(/OS ([\d_]+)/)?.[1].replace(/_/g, '.');
    os = iosVersion ? `iOS ${iosVersion}` : 'iOS';
  }

  // Detect device type
  let device = 'Desktop';
  if (ua.includes('Mobile') || ua.includes('Android')) device = 'Mobile';
  else if (ua.includes('Tablet') || ua.includes('iPad')) device = 'Tablet';

  // Detect if bot
  const isBot = /bot|crawler|spider|crawling/i.test(ua);

  const result = `USER AGENT PARSER

Browser: ${browser}${version ? ' ' + version : ''}
OS: ${os}
Device: ${device}
${isBot ? 'Type: Bot/Crawler' : ''}

Full UA:
${ua}`;

  state.text = result;
}

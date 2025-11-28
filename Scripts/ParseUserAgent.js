/**
  {
    "api": 1,
    "name": "Parse User Agent",
    "description": "Extract browser and OS information from User-Agent string",
    "author": "Boop",
    "icon": "info",
    "tags": "user-agent,browser,parse,http"
  }
**/

function main(state) {
  const ua = state.text.trim();

  const info = {
    original: ua,
    browser: 'Unknown',
    version: 'Unknown',
    os: 'Unknown',
    mobile: false
  };

  // Detect browser
  if (ua.includes('Chrome')) {
    info.browser = 'Chrome';
    const match = ua.match(/Chrome\/([0-9.]+)/);
    if (match) info.version = match[1];
  } else if (ua.includes('Firefox')) {
    info.browser = 'Firefox';
    const match = ua.match(/Firefox\/([0-9.]+)/);
    if (match) info.version = match[1];
  } else if (ua.includes('Safari') && !ua.includes('Chrome')) {
    info.browser = 'Safari';
    const match = ua.match(/Version\/([0-9.]+)/);
    if (match) info.version = match[1];
  } else if (ua.includes('Edge')) {
    info.browser = 'Edge';
    const match = ua.match(/Edge\/([0-9.]+)/);
    if (match) info.version = match[1];
  }

  // Detect OS
  if (ua.includes('Windows')) info.os = 'Windows';
  else if (ua.includes('Mac OS X')) info.os = 'macOS';
  else if (ua.includes('Linux')) info.os = 'Linux';
  else if (ua.includes('Android')) info.os = 'Android';
  else if (ua.includes('iOS') || ua.includes('iPhone') || ua.includes('iPad')) info.os = 'iOS';

  // Detect mobile
  info.mobile = /Mobile|Android|iPhone|iPad/.test(ua);

  state.text = JSON.stringify(info, null, 2);
  state.postInfo("User agent parsed");
}

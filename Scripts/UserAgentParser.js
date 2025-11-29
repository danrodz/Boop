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
  try {
    const ua = String(state.text || '').trim();
    if (!ua) {
      if (typeof state.postError === 'function') {
        state.postError("Empty User-Agent string");
      }
      return;
    }

    // Browser detection
    let browser = 'Unknown';
    let version = '';

    let m;
    if ((m = ua.match(/Firefox\/([\d.]+)/))) {
      browser = 'Firefox';
      version = m[1];
    } else if ((m = ua.match(/Edg\/([\d.]+)/))) {
      browser = 'Microsoft Edge';
      version = m[1];
    } else if ((m = ua.match(/Edge\/([\d.]+)/))) {
      browser = 'Microsoft Edge';
      version = m[1];
    } else if (ua.includes('Chrome/') && !ua.includes('Edg/') && !ua.includes('OPR/') && !ua.includes('Brave/')) {
      m = ua.match(/Chrome\/([\d.]+)/);
      browser = 'Chrome';
      version = m ? m[1] : '';
    } else if (ua.includes('Safari/') && !ua.includes('Chrome')) {
      browser = 'Safari';
      m = ua.match(/Version\/([\d.]+)/);
      version = m ? m[1] : '';
    } else if (ua.includes('MSIE') || ua.includes('Trident/')) {
      browser = 'Internet Explorer';
      m = ua.match(/(?:MSIE |rv:)([\d.]+)/);
      version = m ? m[1] : '';
    }

    // OS detection
    let os = 'Unknown';

    if (ua.includes('Windows NT 10.0')) os = 'Windows 10/11';
    else if (ua.includes('Windows NT 6.3')) os = 'Windows 8.1';
    else if (ua.includes('Windows NT 6.2')) os = 'Windows 8';
    else if (ua.includes('Windows NT 6.1')) os = 'Windows 7';
    else if (ua.includes('Windows')) os = 'Windows';
    else if (ua.includes('Mac OS X')) {
      const macVersion = ua.match(/Mac OS X ([\d_]+)/);
      os = macVersion ? `macOS ${macVersion[1].replace(/_/g, '.')}` : 'macOS';
    } else if (ua.includes('Android')) {
      const androidVersion = ua.match(/Android ([\d.]+)/);
      os = androidVersion ? `Android ${androidVersion[1]}` : 'Android';
    } else if (ua.match(/iPhone|iPad|iPod/)) {
      const iosVersion = ua.match(/OS ([\d_]+)/);
      os = iosVersion ? `iOS ${iosVersion[1].replace(/_/g, '.')}` : 'iOS';
    } else if (ua.includes('Linux')) {
      os = 'Linux';
    }

    // Device type
    let device = 'Desktop';
    if (/Mobile|Android/i.test(ua)) device = 'Mobile';
    else if (/Tablet|iPad/i.test(ua)) device = 'Tablet';

    // Bot detection
    const isBot = /(bot|crawler|spider|scraper|crawling|googlebot|bingbot)/i.test(ua);

    const result =
      'USER AGENT PARSER\n\n' +
      `Browser: ${browser}${version ? ' ' + version : ''}\n` +
      `OS: ${os}\n` +
      `Device: ${device}\n` +
      `Type: ${isBot ? 'Bot/Crawler' : 'Browser'}\n\n` +
      'Full UA:\n' +
      ua;

    state.text = result;
    if (typeof state.postInfo === 'function') {
      state.postInfo("Parsed User-Agent");
    }
  } catch (error) {
    if (typeof state.postError === 'function') {
      state.postError("Failed to parse User-Agent: " + error.message);
    }
  }
}

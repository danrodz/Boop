/**
  {
    "api": 1,
    "name": "IP to Geolocation Info",
    "description": "Get geolocation info for IP address (requires internet)",
    "author": "Boop",
    "icon": "globe",
    "tags": "ip,geolocation,location,geo"
  }
**/

function main(state) {
  try {
    const ip = state.text.trim();

    // Validate IP format
    const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
    if (!ipv4Regex.test(ip)) {
      state.postError("Invalid IPv4 address");
      return;
    }

    // Generate API URLs (note: Boop doesn't support network requests)
    const apis = [
      `https://ipapi.co/${ip}/json/`,
      `https://ip-api.com/json/${ip}`,
      `https://ipinfo.io/${ip}/json`,
    ];

    let result = `IP Address: ${ip}\n\n`;
    result += 'To get geolocation data, visit:\n\n';
    result += apis.join('\n\n');
    result += '\n\nNote: Boop cannot make network requests.\n';
    result += 'Copy one of the URLs above to your browser.';

    state.text = result;
    state.postInfo("Network requests not supported in Boop");
  } catch (error) {
    state.postError("Failed to process IP: " + error.message);
  }
}

/**
  {
    "api": 1,
    "name": "Log Parser",
    "description": "Parse and format log files with highlighting",
    "author": "Boop",
    "icon": "doc.text.magnifyingglass",
    "tags": "log,parse,format,debug,error"
  }
**/

function main(state) {
  try {
    const lines = state.text.split('\n');
    const result = [];

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;

      // Detect log level
      if (trimmed.match(/\b(ERROR|FATAL|CRITICAL)\b/i)) {
        result.push('🔴 ' + trimmed);
      } else if (trimmed.match(/\b(WARN|WARNING)\b/i)) {
        result.push('🟡 ' + trimmed);
      } else if (trimmed.match(/\b(INFO|INFORMATION)\b/i)) {
        result.push('🔵 ' + trimmed);
      } else if (trimmed.match(/\b(DEBUG|TRACE)\b/i)) {
        result.push('⚪ ' + trimmed);
      } else if (trimmed.match(/\b(SUCCESS|OK)\b/i)) {
        result.push('🟢 ' + trimmed);
      } else {
        result.push('   ' + trimmed);
      }
    }

    state.text = result.join('\n');
    state.postInfo("Log file parsed");
  } catch (error) {
    state.postError("Error parsing log: " + error.message);
  }
}

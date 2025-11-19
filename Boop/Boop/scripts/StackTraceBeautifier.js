/**
  {
    "api": 1,
    "name": "Stack Trace Beautifier",
    "description": "Beautify and format stack traces for better readability",
    "author": "Boop",
    "icon": "list.bullet.rectangle",
    "tags": "stack,trace,error,debug,format"
  }
**/

function main(state) {
  try {
    const lines = state.text.split('\n');
    const result = [];

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;

      // JavaScript stack trace format
      const jsMatch = trimmed.match(/at\s+(.+?)\s+\((.+?):(\d+):(\d+)\)/);
      if (jsMatch) {
        result.push(`📍 ${jsMatch[1]}`);
        result.push(`   ${jsMatch[2]}:${jsMatch[3]}:${jsMatch[4]}`);
        continue;
      }

      // Python stack trace format
      const pyMatch = trimmed.match(/File\s+"(.+?)",\s+line\s+(\d+),\s+in\s+(.+)/);
      if (pyMatch) {
        result.push(`📍 ${pyMatch[3]}`);
        result.push(`   ${pyMatch[1]}:${pyMatch[2]}`);
        continue;
      }

      // Java stack trace format
      const javaMatch = trimmed.match(/at\s+(.+?)\.(.+?)\((.+?):(\d+)\)/);
      if (javaMatch) {
        result.push(`📍 ${javaMatch[1]}.${javaMatch[2]}`);
        result.push(`   ${javaMatch[3]}:${javaMatch[4]}`);
        continue;
      }

      // Error message
      if (trimmed.match(/Error:|Exception:|Traceback/)) {
        result.push(`❌ ${trimmed}`);
        continue;
      }

      result.push(trimmed);
    }

    state.text = result.join('\n');
  } catch (error) {
    state.postError("Error beautifying stack trace: " + error.message);
  }
}

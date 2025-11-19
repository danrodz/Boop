/**
  {
    "api": 1,
    "name": "WebSocket Message Formatter",
    "description": "Format and analyze WebSocket messages",
    "author": "Boop",
    "icon": "arrow.left.arrow.right",
    "tags": "websocket,ws,message,format"
  }
**/

function main(state) {
  try {
    let text = state.text.trim();

    // Try to parse as JSON
    let message;
    let isJSON = false;

    try {
      message = JSON.parse(text);
      isJSON = true;
    } catch {
      message = text;
    }

    let result = `=== WEBSOCKET MESSAGE ===\n\n`;

    if (isJSON) {
      result += `Format: JSON\n`;
      result += `Size: ${text.length} bytes\n\n`;

      result += `=== FORMATTED MESSAGE ===\n`;
      result += JSON.stringify(message, null, 2) + '\n\n';

      // Analyze message structure
      result += `=== STRUCTURE ===\n`;

      if (message.type || message.event) {
        result += `Message Type: ${message.type || message.event}\n`;
      }

      if (message.id) {
        result += `Message ID: ${message.id}\n`;
      }

      if (message.data || message.payload) {
        result += `Contains Data: Yes\n`;
      }

      if (message.timestamp) {
        result += `Timestamp: ${message.timestamp}\n`;
      }

      result += `\n=== PROPERTIES (${Object.keys(message).length}) ===\n`;

      Object.keys(message).forEach(key => {
        const value = message[key];
        const type = Array.isArray(value) ? 'array' : typeof value;
        result += `${key}: <${type}>\n`;
      });

      // Generate client/server templates
      result += `\n=== CLIENT TEMPLATE (JavaScript) ===\n`;
      result += `const ws = new WebSocket('wss://example.com');\n\n`;
      result += `// Send message\n`;
      result += `ws.send(JSON.stringify(${JSON.stringify(message, null, 2)}));\n\n`;
      result += `// Receive message\n`;
      result += `ws.onmessage = (event) => {\n`;
      result += `  const data = JSON.parse(event.data);\n`;
      result += `  console.log(data);\n`;
      result += `};\n\n`;

      result += `=== FRAME INFO ===\n`;
      result += `Opcode: 1 (Text frame)\n`;
      result += `Payload Length: ${text.length} bytes\n`;

      if (text.length < 126) {
        result += `Frame Size: ${text.length + 6} bytes (small payload)\n`;
      } else if (text.length < 65536) {
        result += `Frame Size: ${text.length + 8} bytes (medium payload)\n`;
      } else {
        result += `Frame Size: ${text.length + 14} bytes (large payload)\n`;
      }

    } else {
      result += `Format: Plain Text\n`;
      result += `Size: ${text.length} bytes\n\n`;

      result += `=== MESSAGE ===\n`;
      result += text + '\n\n';

      result += `=== FRAME INFO ===\n`;
      result += `Opcode: 1 (Text frame)\n`;
      result += `Payload Length: ${text.length} bytes\n`;
    }

    state.text = result;
  } catch (error) {
    state.postError("WebSocket formatting failed: " + error.message);
  }
}

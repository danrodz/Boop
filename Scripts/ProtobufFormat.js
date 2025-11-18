/**
  {
    "api": 1,
    "name": "Format Protocol Buffers",
    "description": "Pretty-print .proto files",
    "author": "Boop",
    "icon": "doc.text",
    "tags": "protobuf,proto,format,grpc"
  }
**/

function main(state) {
  try {
    let proto = state.text.trim();
    let indent = 0;
    let result = '';
    const lines = proto.split('\n');

    for (let line of lines) {
      line = line.trim();
      if (!line) continue;

      // Decrease indent for closing braces
      if (line.startsWith('}')) {
        indent--;
      }

      result += '  '.repeat(indent) + line + '\n';

      // Increase indent for opening braces
      if (line.endsWith('{')) {
        indent++;
      }
    }

    state.text = result.trim();
  } catch (error) {
    state.postError("Failed to format Protocol Buffers: " + error.message);
  }
}

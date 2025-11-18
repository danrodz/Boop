/**
  {
    "api": 1,
    "name": "Redis Command Builder",
    "description": "Build Redis commands from simple syntax",
    "author": "Boop",
    "icon": "server.rack",
    "tags": "redis,command,cache,database"
  }
**/

function main(state) {
  try {
    const input = state.text.trim().toLowerCase();

    let commands = '';

    if (input.startsWith('set ')) {
      const parts = input.split(' ');
      commands += `SET ${parts[1]} "${parts.slice(2).join(' ')}"\n`;
      commands += `\n# With expiration (10 minutes):\n`;
      commands += `SETEX ${parts[1]} 600 "${parts.slice(2).join(' ')}"\n`;
    } else if (input.startsWith('get ')) {
      const key = input.split(' ')[1];
      commands += `GET ${key}\n`;
    } else if (input.startsWith('list ')) {
      const key = input.split(' ')[1];
      commands += `# Push to list:\n`;
      commands += `LPUSH ${key} "value"\n`;
      commands += `RPUSH ${key} "value"\n\n`;
      commands += `# Get list:\n`;
      commands += `LRANGE ${key} 0 -1\n`;
    } else if (input.startsWith('hash ')) {
      const key = input.split(' ')[1];
      commands += `# Set hash field:\n`;
      commands += `HSET ${key} field "value"\n\n`;
      commands += `# Get hash field:\n`;
      commands += `HGET ${key} field\n\n`;
      commands += `# Get all hash:\n`;
      commands += `HGETALL ${key}\n`;
    } else {
      commands = `# Common Redis Commands:\n\n`;
      commands += `SET key "value"          # Set string\n`;
      commands += `GET key                  # Get string\n`;
      commands += `DEL key                  # Delete key\n`;
      commands += `EXISTS key               # Check if exists\n`;
      commands += `EXPIRE key 60            # Set expiration\n`;
      commands += `TTL key                  # Get time to live\n`;
      commands += `KEYS pattern             # Find keys\n`;
      commands += `LPUSH list "value"       # Push to list\n`;
      commands += `HSET hash field "value"  # Set hash field\n`;
      commands += `SADD set "member"        # Add to set\n`;
    }

    state.text = commands;
  } catch (error) {
    state.postError("Failed to build commands: " + error.message);
  }
}

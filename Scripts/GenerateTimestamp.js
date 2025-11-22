/**
  {
    "api": 1,
    "name": "Generate Timestamp",
    "description": "Generates current timestamp in multiple formats",
    "author": "Boop",
    "icon": "clock.fill",
    "tags": "timestamp,generate,now,date,time"
  }
**/

function main(state) {
  const now = new Date();

  const timestamps = `CURRENT TIMESTAMP

Unix (seconds): ${Math.floor(now.getTime() / 1000)}
Unix (milliseconds): ${now.getTime()}

ISO 8601: ${now.toISOString()}
RFC 2822: ${now.toUTCString()}
Local: ${now.toLocaleString()}

Date only: ${now.toISOString().split('T')[0]}
Time only: ${now.toTimeString().split(' ')[0]}

Year: ${now.getFullYear()}
Month: ${String(now.getMonth() + 1).padStart(2, '0')}
Day: ${String(now.getDate()).padStart(2, '0')}
Hour: ${String(now.getHours()).padStart(2, '0')}
Minute: ${String(now.getMinutes()).padStart(2, '0')}
Second: ${String(now.getSeconds()).padStart(2, '0')}`;

  state.text = timestamps;
}

/**
  {
    "api": 1,
    "name": "Parse Apache/Nginx Log",
    "description": "Parses Common Log Format entries to JSON",
    "author": "Boop",
    "icon": "doc.text",
    "tags": "apache,nginx,log,parse,access"
  }
**/

function main(state) {
  var lines = state.text.trim().split("\n");
  var entries = [];
  
  // Common Log Format: %h %l %u %t "%r" %>s %b
  // Combined adds: "%{Referer}i" "%{User-agent}i"
  var pattern = /^(\S+)\s+(\S+)\s+(\S+)\s+\[([^\]]+)\]\s+"([^"]+)"\s+(\d+)\s+(\S+)(?:\s+"([^"]*)")?(?:\s+"([^"]*)")?/;
  
  lines.forEach(function(line, idx) {
    var match = line.match(pattern);
    if (match) {
      var requestParts = match[5].split(" ");
      entries.push({
        ip: match[1],
        ident: match[2] === "-" ? null : match[2],
        user: match[3] === "-" ? null : match[3],
        timestamp: match[4],
        method: requestParts[0],
        path: requestParts[1],
        protocol: requestParts[2],
        status: parseInt(match[6]),
        bytes: match[7] === "-" ? 0 : parseInt(match[7]),
        referer: match[8] && match[8] !== "-" ? match[8] : null,
        userAgent: match[9] || null
      });
    }
  });
  
  if (entries.length === 0) {
    state.postError("No valid log entries found");
    return;
  }
  
  // Add summary statistics
  var statusCounts = {};
  var totalBytes = 0;
  entries.forEach(function(e) {
    var statusGroup = Math.floor(e.status / 100) + "xx";
    statusCounts[statusGroup] = (statusCounts[statusGroup] || 0) + 1;
    totalBytes += e.bytes;
  });
  
  var output = {
    entries: entries,
    summary: {
      totalRequests: entries.length,
      statusCodes: statusCounts,
      totalBytes: totalBytes,
      avgBytes: Math.round(totalBytes / entries.length)
    }
  };
  
  state.text = JSON.stringify(output, null, 2);
  state.postInfo("Parsed " + entries.length + " log entries");
}

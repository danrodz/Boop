/**
  {
    "api": 1,
    "name": "CSV to JSON",
    "description": "Converts CSV data to JSON array",
    "author": "Boop",
    "icon": "doc.text",
    "tags": "csv,json,convert,data,array"
  }
**/

function main(state) {
  const lines = state.text.trim().split('\n');
  if (lines.length < 2) {
    state.postError("Need at least header row and one data row");
    return;
  }
  
  function parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    result.push(current.trim());
    return result;
  }
  
  const headers = parseCSVLine(lines[0]);
  const data = [];
  
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === '') continue;
    const values = parseCSVLine(lines[i]);
    const obj = {};
    headers.forEach((header, idx) => {
      obj[header] = values[idx] || '';
    });
    data.push(obj);
  }
  
  state.text = JSON.stringify(data, null, 2);
  state.postInfo(`Converted ${data.length} row(s) to JSON`);
}

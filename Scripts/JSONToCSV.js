/**
  {
    "api": 1,
    "name": "JSON to CSV",
    "description": "Converts JSON array to CSV format",
    "author": "Boop",
    "icon": "doc.text",
    "tags": "json,csv,convert,data,export"
  }
**/

function main(state) {
  let data;
  try {
    data = JSON.parse(state.text);
  } catch (e) {
    state.postError("Invalid JSON");
    return;
  }
  
  if (!Array.isArray(data) || data.length === 0) {
    state.postError("JSON must be a non-empty array of objects");
    return;
  }
  
  const headers = Object.keys(data[0]);
  
  function escapeCSV(val) {
    const str = String(val ?? '');
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return '"' + str.replace(/"/g, '""') + '"';
    }
    return str;
  }
  
  const rows = [headers.map(escapeCSV).join(',')];
  
  for (const obj of data) {
    const row = headers.map(h => escapeCSV(obj[h]));
    rows.push(row.join(','));
  }
  
  state.text = rows.join('\n');
  state.postInfo(`Converted ${data.length} row(s) to CSV`);
}

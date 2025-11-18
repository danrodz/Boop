/**
{
  "api": 1,
  "name": "HTML Table to CSV",
  "description": "Extracts tables from HTML and converts to CSV",
  "author": "Boop",
  "icon": "table",
  "tags": "html,table,csv,extract"
}
**/

function main(state) {
  const rows = state.text.match(/<tr[^>]*>[\s\S]*?<\/tr>/gi) || [];
  const csvLines = [];

  for (const row of rows) {
    const cells = row.match(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/gi) || [];
    const values = cells.map(cell => {
      const text = cell.replace(/<[^>]+>/g, '').trim();
      return `"${text.replace(/"/g, '""')}"`;
    });
    csvLines.push(values.join(','));
  }

  state.text = csvLines.join('\n');
}

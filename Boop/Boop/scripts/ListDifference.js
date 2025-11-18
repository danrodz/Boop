/**
{
  "api": 1,
  "name": "List Difference",
  "description": "Items in first list but not second (separate with blank line)",
  "author": "Boop",
  "icon": "minus.circle",
  "tags": "list,difference,set,subtract"
}
**/

function main(state) {
  const parts = state.text.split('\n\n');
  if (parts.length !== 2) {
    state.postError("Separate two lists with a blank line");
    return;
  }

  const list1 = new Set(parts[0].split('\n').filter(l => l.trim()));
  const list2 = new Set(parts[1].split('\n').filter(l => l.trim()));

  const difference = new Set([...list1].filter(x => !list2.has(x)));
  state.text = Array.from(difference).sort().join('\n');
}

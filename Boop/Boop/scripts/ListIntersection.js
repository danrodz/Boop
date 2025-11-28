/**
{
  "api": 1,
  "name": "List Intersection",
  "description": "Intersection of two lists (separate with blank line)",
  "author": "Boop",
  "icon": "circle.grid.cross",
  "tags": "list,intersection,set,common"
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

  const intersection = new Set([...list1].filter(x => list2.has(x)));
  state.text = Array.from(intersection).sort().join('\n');
}

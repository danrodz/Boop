/**
  {
    "api": 1,
    "name": "Reading Time Estimate",
    "description": "Estimates reading time (avg 200 wpm)",
    "author": "Boop",
    "icon": "clock",
    "tags": "reading,time,estimate,statistics"
  }
**/

function main(state) {
  const words = state.text.trim().split(/\s+/).filter(w => w.length > 0).length;
  const minutes = Math.ceil(words / 200);
  const seconds = Math.ceil((words / 200) * 60) % 60;
  state.text = `Estimated reading time: ${minutes} min ${seconds} sec`;
}

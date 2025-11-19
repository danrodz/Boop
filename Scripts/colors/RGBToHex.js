/**
  {
    "api": 1,
    "name": "RGB to Hex",
    "description": "Converts RGB to hex color",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,format,convert"
  }
**/

function main(state) {
  const nums = state.text.match(/\d+/g);
  if (nums && nums.length >= 3) {
    const hex = nums.slice(0, 3).map(n => {
      const h = parseInt(n).toString(16);
      return h.length === 1 ? '0' + h : h;
    }).join('');
    state.text = '#' + hex.toUpperCase();
  }
}

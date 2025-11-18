/**
  {
    "api": 1,
    "name": "Mirror Text",
    "description": "Mirrors text using Unicode mirrored characters",
    "author": "Boop",
    "icon": "arrow.left.and.right.righttriangle.left.righttriangle.right",
    "tags": "mirror,flip,unicode"
  }
**/

const MIRROR_MAP = {
  '(': ')', ')': '(', '[': ']', ']': '[', '{': '}', '}': '{', '<': '>', '>': '<',
  '/': '\\', '\\': '/', 'd': 'b', 'b': 'd', 'p': 'q', 'q': 'p'
};

function main(state) {
  const mirrored = state.text.split('').reverse().map(char => MIRROR_MAP[char] || char).join('');
  state.text = mirrored;
}

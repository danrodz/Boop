/**
  {
    "api": 1,
    "name": "Generate MAC Address",
    "description": "Generates random MAC address",
    "author": "Boop",
    "icon": "wand.and.stars",
    "tags": "generate,random,create,mock"
  }
**/

function main(state) {
  const mac = Array.from({length: 6}, () => 
    Math.floor(Math.random() * 256).toString(16).padStart(2, '0')
  ).join(':');
  state.insert(mac.toUpperCase());
}

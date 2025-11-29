/**
  {
    "api": 1,
    "name": "JSX to React Native",
    "description": "Convert HTML/JSX tags to React Native components",
    "author": "Boop",
    "icon": "code",
    "tags": "react,react-native,jsx,convert,mobile"
  }
**/

function main(state) {
  const mapping = {
    'div': 'View',
    'span': 'Text',
    'p': 'Text',
    'h1': 'Text',
    'h2': 'Text',
    'h3': 'Text',
    'h4': 'Text',
    'h5': 'Text',
    'h6': 'Text',
    'img': 'Image',
    'input': 'TextInput',
    'button': 'TouchableOpacity',
    'a': 'TouchableOpacity',
    'ul': 'View',
    'ol': 'View',
    'li': 'View'
  };

  let result = state.text;

  for (const [html, rn] of Object.entries(mapping)) {
    const openTag = new RegExp(`<${html}([\\s>])`, 'gi');
    const closeTag = new RegExp(`</${html}>`, 'gi');
    result = result.replace(openTag, `<${rn}$1`);
    result = result.replace(closeTag, `</${rn}>`);
  }

  state.text = result;
  state.postInfo("Converted to React Native components");
}

/**
  {
    "api": 1,
    "name": "HTML to JSX",
    "description": "Convert HTML to JSX (className, htmlFor, etc.)",
    "author": "Boop",
    "icon": "code",
    "tags": "html,jsx,react,convert"
  }
**/

function main(state) {
  let result = state.text;

  // class -> className
  result = result.replace(/\sclass=/g, ' className=');

  // for -> htmlFor
  result = result.replace(/\sfor=/g, ' htmlFor=');

  // Self-closing tags
  const selfClosing = ['img', 'input', 'br', 'hr', 'meta', 'link'];
  selfClosing.forEach(tag => {
    const regex = new RegExp(`<${tag}([^>]*)(?<!/)>`, 'gi');
    result = result.replace(regex, `<${tag}$1 />`);
  });

  // Style attribute: convert CSS string to object
  result = result.replace(/style="([^"]*)"/g, (match, styles) => {
    const styleObj = styles.split(';')
      .filter(s => s.trim())
      .map(s => {
        const [prop, value] = s.split(':').map(x => x.trim());
        const camelProp = prop.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
        return `${camelProp}: '${value}'`;
      })
      .join(', ');
    return `style={{${styleObj}}}`;
  });

  state.text = result;
  state.postInfo("Converted HTML to JSX");
}

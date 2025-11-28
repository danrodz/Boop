/**
  {
    "api": 1,
    "name": "CSS to Styled Components",
    "description": "Convert CSS to styled-components template literal",
    "author": "Boop",
    "icon": "palette",
    "tags": "css,styled-components,react,convert"
  }
**/

function main(state) {
  let css = state.text.trim();

  // Extract selector if present
  let tag = 'div';
  const selectorMatch = css.match(/^(\w+)\s*\{/);
  if (selectorMatch) {
    tag = selectorMatch[1];
    css = css.replace(/^\w+\s*\{/, '').replace(/\}\s*$/, '');
  }

  // Clean up and format
  css = css.trim();

  const componentName = tag.charAt(0).toUpperCase() + tag.slice(1);
  const result = `import styled from 'styled-components';

const Styled${componentName} = styled.${tag}\`
${css}
\`;`;

  state.text = result;
  state.postInfo("Converted to styled-components");
}

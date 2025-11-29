/**
  {
    "api": 1,
    "name": "Styled Components to Emotion",
    "description": "Convert styled-components syntax to Emotion css prop",
    "author": "Boop",
    "icon": "palette",
    "tags": "styled-components,emotion,css-in-js,convert"
  }
**/

function main(state) {
  let result = state.text;

  // styled.div`...` -> css`...`
  result = result.replace(/const\s+(\w+)\s+=\s+styled\.(\w+)`([^`]*)`/gs,
    (match, name, tag, styles) => {
      return `const ${name} = <${tag} css={css\`${styles}\`} />`;
    });

  // Add import suggestion
  if (result !== state.text) {
    result = "/** @jsxImportSource @emotion/react */\nimport { css } from '@emotion/react';\n\n" + result;
  }

  state.text = result;
  state.postInfo("Converted to Emotion");
}

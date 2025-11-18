/**
  {
    "api": 1,
    "name": "Svelte to React",
    "description": "Convert basic Svelte component to React",
    "author": "Boop",
    "icon": "code",
    "tags": "svelte,react,convert,component"
  }
**/

function main(state) {
  let result = state.text;

  // <script> -> component logic
  result = result.replace(/<script>([\s\S]*?)<\/script>/g, (match, script) => {
    let jsCode = script;
    // let -> const [..., set...] = useState
    jsCode = jsCode.replace(/let\s+(\w+)\s*=\s*([^;]+);/g, 'const [$1, set' +
      '$1'.charAt(0).toUpperCase() + '$1'.slice(1) + '] = useState($2);');
    return jsCode;
  });

  // {#if} -> {condition &&
  result = result.replace(/\{#if\s+([^}]+)\}/g, '{$1 && (');
  result = result.replace(/\{\/if\}/g, ')}');

  // {#each} -> .map()
  result = result.replace(/\{#each\s+(\w+)\s+as\s+(\w+)\}/g, '{$1.map($2 => (');
  result = result.replace(/\{\/each\}/g, '))}');

  // on:click -> onClick
  result = result.replace(/on:(\w+)=/g, (match, event) => {
    const reactEvent = 'on' + event.charAt(0).toUpperCase() + event.slice(1);
    return reactEvent + '=';
  });

  // bind:value -> value + onChange
  result = result.replace(/bind:value=\{(\w+)\}/g,
    'value={$1} onChange={(e) => set$1(e.target.value)}');

  state.text = result;
  state.postInfo("Converted Svelte to React (review needed)");
}

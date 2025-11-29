/**
  {
    "api": 1,
    "name": "Vue Template to React JSX",
    "description": "Convert Vue template syntax to React JSX",
    "author": "Boop",
    "icon": "code",
    "tags": "vue,react,jsx,convert,template"
  }
**/

function main(state) {
  let result = state.text;

  // v-if -> {condition &&
  result = result.replace(/v-if="([^"]*)"/g, '{$1 && ');

  // v-for -> .map()
  result = result.replace(/<(\w+)\s+v-for="(\w+)\s+in\s+(\w+)"([^>]*)>/g,
    '{$3.map($2 => <$1$4 key={$2.id}>)}');

  // v-bind:attr or :attr -> attr={value}
  result = result.replace(/:(\w+)="([^"]*)"/g, '$1={$2}');
  result = result.replace(/v-bind:(\w+)="([^"]*)"/g, '$1={$2}');

  // v-on:event or @event -> onEvent={handler}
  result = result.replace(/@click="([^"]*)"/g, 'onClick={$1}');
  result = result.replace(/v-on:click="([^"]*)"/g, 'onClick={$1}');

  // v-model -> value + onChange
  result = result.replace(/v-model="([^"]*)"/g, 'value={$1} onChange={(e) => set' +
    '$1'.charAt(0).toUpperCase() + '$1'.slice(1) + '(e.target.value)}');

  state.text = result;
  state.postInfo("Converted Vue template to React JSX");
}

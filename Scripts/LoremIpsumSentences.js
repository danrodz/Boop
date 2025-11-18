/**
  {
    "api": 1,
    "name": "Lorem Ipsum (Sentences)",
    "description": "Generate Lorem Ipsum in sentences",
    "author": "Boop",
    "icon": "doc.text",
    "tags": "lorem,ipsum,generate,text,sentences"
  }
**/

function main(state) {
  try {
    const count = parseInt(state.text) || 5;

    const sentences = [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      "Nisi ut aliquip ex ea commodo consequat.",
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.",
      "Dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat.",
      "Non proident sunt in culpa qui officia deserunt mollit anim id est.",
      "Laborum sed ut perspiciatis unde omnis iste natus error sit voluptatem.",
      "Accusantium doloremque laudantium totam rem aperiam eaque ipsa quae.",
      "Ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt.",
    ];

    let result = '';
    for (let i = 0; i < count; i++) {
      result += sentences[i % sentences.length] + ' ';
    }

    state.text = result.trim();
  } catch (error) {
    state.postError("Failed to generate Lorem Ipsum: " + error.message);
  }
}

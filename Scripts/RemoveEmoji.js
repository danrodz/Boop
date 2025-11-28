/**
  {
    "api": 1,
    "name": "Remove Emoji",
    "description": "Remove all emoji characters from text",
    "author": "Boop",
    "icon": "face.smiling",
    "tags": "emoji,remove,strip,clean"
  }
**/

function main(state) {
  try {
    // Emoji regex pattern
    const emojiRegex = /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F900}-\u{1F9FF}]|[\u{1F018}-\u{1F270}]|[\u{238C}-\u{2454}]|[\u{20D0}-\u{20FF}]/gu;

    state.text = state.text.replace(emojiRegex, '');
  } catch (error) {
    state.postError("Failed to remove emoji: " + error.message);
  }
}

/**
  {
    "api": 1,
    "name": "Fake Phone Generator",
    "description": "Generate fake phone numbers for testing",
    "author": "Boop",
    "icon": "phone",
    "tags": "fake,phone,generate,mock,test"
  }
**/

function main(state) {
  try {
    const count = parseInt(state.text.trim()) || 10;

    if (count < 1 || count > 100) {
      state.postError("Count must be between 1 and 100");
      return;
    }

    const phones = [];

    // Using 555 prefix (reserved for fictional use in North America)
    for (let i = 0; i < count; i++) {
      const areaCode = 200 + Math.floor(Math.random() * 800);
      const exchange = 555; // Fictional exchange
      const subscriber = Math.floor(Math.random() * 10000).toString().padStart(4, '0');

      const formats = [
        `(${areaCode}) ${exchange}-${subscriber}`,
        `${areaCode}-${exchange}-${subscriber}`,
        `${areaCode}.${exchange}.${subscriber}`,
        `+1 ${areaCode} ${exchange} ${subscriber}`,
        `${areaCode}${exchange}${subscriber}`
      ];

      const phone = formats[Math.floor(Math.random() * formats.length)];
      phones.push(phone);
    }

    state.text = phones.join('\n');
    state.postInfo(`Generated ${count} fake phone number(s)`);
  } catch (error) {
    state.postError("Error generating phone numbers: " + error.message);
  }
}

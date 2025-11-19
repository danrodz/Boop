/**
  {
    "api": 1,
    "name": "Fake Address Generator",
    "description": "Generate fake addresses for testing",
    "author": "Boop",
    "icon": "house",
    "tags": "fake,address,generate,mock,test"
  }
**/

function main(state) {
  try {
    const count = parseInt(state.text.trim()) || 5;

    if (count < 1 || count > 50) {
      state.postError("Count must be between 1 and 50");
      return;
    }

    const streets = ['Main', 'Oak', 'Maple', 'Cedar', 'Elm', 'Washington', 'Lake', 'Hill', 'Park', 'River'];
    const types = ['St', 'Ave', 'Blvd', 'Dr', 'Ln', 'Rd', 'Way', 'Ct'];
    const cities = ['Springfield', 'Madison', 'Franklin', 'Georgetown', 'Arlington', 'Clayton', 'Bristol', 'Salem'];
    const states = ['CA', 'NY', 'TX', 'FL', 'IL', 'PA', 'OH', 'GA', 'NC', 'MI'];

    const addresses = [];

    for (let i = 0; i < count; i++) {
      const number = Math.floor(Math.random() * 9999) + 1;
      const street = streets[Math.floor(Math.random() * streets.length)];
      const type = types[Math.floor(Math.random() * types.length)];
      const city = cities[Math.floor(Math.random() * cities.length)];
      const state = states[Math.floor(Math.random() * states.length)];
      const zip = Math.floor(Math.random() * 90000) + 10000;

      addresses.push(`${number} ${street} ${type}, ${city}, ${state} ${zip}`);
    }

    state.text = addresses.join('\n');
    state.postInfo(`Generated ${count} fake address(es)`);
  } catch (error) {
    state.postError("Error generating addresses: " + error.message);
  }
}

/**
  {
    "api": 1,
    "name": "Fake Name Generator",
    "description": "Generate fake names for testing",
    "author": "Boop",
    "icon": "person",
    "tags": "fake,name,generate,mock,test"
  }
**/

function main(state) {
  try {
    const count = parseInt(state.text.trim()) || 10;

    if (count < 1 || count > 100) {
      state.postError("Count must be between 1 and 100");
      return;
    }

    const firstNames = [
      'James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda',
      'William', 'Elizabeth', 'David', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica',
      'Thomas', 'Sarah', 'Charles', 'Karen', 'Christopher', 'Nancy', 'Daniel', 'Lisa',
      'Matthew', 'Betty', 'Anthony', 'Margaret', 'Mark', 'Sandra', 'Donald', 'Ashley'
    ];

    const lastNames = [
      'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
      'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson',
      'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Thompson', 'White',
      'Harris', 'Clark', 'Lewis', 'Robinson', 'Walker', 'Hall', 'Allen', 'Young'
    ];

    const names = [];

    for (let i = 0; i < count; i++) {
      const first = firstNames[Math.floor(Math.random() * firstNames.length)];
      const last = lastNames[Math.floor(Math.random() * lastNames.length)];

      // Sometimes add middle initial
      if (Math.random() > 0.5) {
        const initial = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        names.push(`${first} ${initial}. ${last}`);
      } else {
        names.push(`${first} ${last}`);
      }
    }

    state.text = names.join('\n');
    state.postInfo(`Generated ${count} fake name(s)`);
  } catch (error) {
    state.postError("Error generating names: " + error.message);
  }
}

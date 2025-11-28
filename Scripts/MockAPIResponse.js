/**
  {
    "api": 1,
    "name": "Generate Mock API Response",
    "description": "Generate realistic mock API response data",
    "author": "Boop",
    "icon": "square.stack.3d.up",
    "tags": "mock,api,fake,data,test"
  }
**/

function main(state) {
  try {
    const count = parseInt(state.text) || 5;

    function randomItem(arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    }

    function randomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const firstNames = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank', 'Grace', 'Henry'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis'];
    const domains = ['example.com', 'test.com', 'demo.com', 'sample.com'];

    const users = [];
    for (let i = 1; i <= count; i++) {
      const firstName = randomItem(firstNames);
      const lastName = randomItem(lastNames);
      users.push({
        id: i,
        name: `${firstName} ${lastName}`,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${randomItem(domains)}`,
        age: randomInt(18, 65),
        active: Math.random() > 0.3,
        createdAt: new Date(Date.now() - randomInt(0, 365) * 24 * 60 * 60 * 1000).toISOString()
      });
    }

    const response = {
      success: true,
      data: users,
      meta: {
        total: count,
        page: 1,
        perPage: count
      }
    };

    state.text = JSON.stringify(response, null, 2);
  } catch (error) {
    state.postError("Failed to generate mock data: " + error.message);
  }
}

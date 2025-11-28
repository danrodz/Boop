/**
  {
    "api": 1,
    "name": "Mock JSON Generator",
    "description": "Generate mock JSON data (input: user, product, post, or count)",
    "author": "Boop",
    "icon": "doc.badge.gearshape",
    "tags": "mock,json,generate,fake,test"
  }
**/

function main(state) {
  try {
    const input = state.text.trim().toLowerCase().split(/\s+/);
    const type = input[0] || 'user';
    const count = parseInt(input[1]) || 1;

    if (count < 1 || count > 50) {
      state.postError("Count must be between 1 and 50");
      return;
    }

    function randomItem(arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    }

    const templates = {
      user: () => ({
        id: Math.floor(Math.random() * 10000),
        name: randomItem(['John Doe', 'Jane Smith', 'Bob Johnson', 'Alice Brown']),
        email: `user${Math.floor(Math.random() * 1000)}@example.com`,
        age: 20 + Math.floor(Math.random() * 50),
        active: Math.random() > 0.5
      }),

      product: () => ({
        id: Math.floor(Math.random() * 10000),
        name: randomItem(['Widget', 'Gadget', 'Device', 'Tool']) + ' ' + Math.floor(Math.random() * 100),
        price: Math.floor(Math.random() * 1000) / 10,
        category: randomItem(['Electronics', 'Home', 'Garden', 'Sports']),
        inStock: Math.random() > 0.3
      }),

      post: () => ({
        id: Math.floor(Math.random() * 10000),
        title: 'Sample Post ' + Math.floor(Math.random() * 100),
        author: randomItem(['John', 'Jane', 'Bob', 'Alice']),
        content: 'This is sample content for testing purposes.',
        createdAt: new Date(2020 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)).toISOString(),
        likes: Math.floor(Math.random() * 1000)
      }),

      order: () => ({
        id: Math.floor(Math.random() * 10000),
        customerId: Math.floor(Math.random() * 1000),
        total: Math.floor(Math.random() * 10000) / 100,
        status: randomItem(['pending', 'processing', 'shipped', 'delivered']),
        orderDate: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)).toISOString()
      })
    };

    const generator = templates[type] || templates.user;
    const data = count === 1 ? generator() : Array.from({ length: count }, generator);

    state.text = JSON.stringify(data, null, 2);
    state.postInfo(`Generated ${count} ${type} record(s)`);
  } catch (error) {
    state.postError("Error generating mock JSON: " + error.message);
  }
}

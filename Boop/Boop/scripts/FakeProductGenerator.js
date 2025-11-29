/**
  {
    "api": 1,
    "name": "Fake Product Generator",
    "description": "Generate fake product data for testing",
    "author": "Boop",
    "icon": "cart",
    "tags": "fake,product,generate,mock,ecommerce"
  }
**/

function main(state) {
  try {
    const count = parseInt(state.text.trim()) || 5;

    if (count < 1 || count > 50) {
      state.postError("Count must be between 1 and 50");
      return;
    }

    const adjectives = ['Premium', 'Deluxe', 'Ultra', 'Pro', 'Elite', 'Advanced', 'Smart', 'Eco', 'Portable', 'Wireless'];
    const nouns = ['Widget', 'Gadget', 'Device', 'Tool', 'System', 'Kit', 'Set', 'Bundle', 'Pack', 'Unit'];
    const categories = ['Electronics', 'Home & Garden', 'Sports & Outdoors', 'Health & Beauty', 'Tools & Hardware', 'Office Supplies'];

    const products = [];

    for (let i = 0; i < count; i++) {
      const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
      const noun = nouns[Math.floor(Math.random() * nouns.length)];
      const cat = categories[Math.floor(Math.random() * categories.length)];
      const price = (Math.floor(Math.random() * 50000) / 100).toFixed(2);
      const sku = 'SKU-' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0');

      const product = {
        sku: sku,
        name: `${adj} ${noun}`,
        category: cat,
        price: `$${price}`,
        stock: Math.floor(Math.random() * 500),
        rating: (3 + Math.random() * 2).toFixed(1)
      };

      products.push(JSON.stringify(product));
    }

    state.text = '[\n  ' + products.join(',\n  ') + '\n]';
    state.postInfo(`Generated ${count} fake product(s)`);
  } catch (error) {
    state.postError("Error generating products: " + error.message);
  }
}

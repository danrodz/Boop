/**
  {
    "api": 1,
    "name": "Random HTML Generator",
    "description": "Generate random HTML structure for testing",
    "author": "Boop",
    "icon": "chevron.left.forwardslash.chevron.right",
    "tags": "random,html,generate,mock,test"
  }
**/

function main(state) {
  try {
    const type = state.text.trim().toLowerCase() || 'page';

    const templates = {
      page: () => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sample Page</title>
</head>
<body>
  <header>
    <h1>Welcome to Sample Page</h1>
  </header>
  <main>
    <section>
      <h2>Section Title</h2>
      <p>This is sample content for testing purposes.</p>
    </section>
  </main>
  <footer>
    <p>&copy; 2024 Sample Company</p>
  </footer>
</body>
</html>`,

      form: () => `<form action="/submit" method="POST">
  <div>
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" required>
  </div>
  <div>
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>
  </div>
  <div>
    <label for="message">Message:</label>
    <textarea id="message" name="message" rows="4"></textarea>
  </div>
  <button type="submit">Submit</button>
</form>`,

      table: () => `<table>
  <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Email</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>John Doe</td>
      <td>john@example.com</td>
      <td>Active</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Jane Smith</td>
      <td>jane@example.com</td>
      <td>Inactive</td>
    </tr>
  </tbody>
</table>`,

      card: () => `<div class="card">
  <img src="https://via.placeholder.com/300x200" alt="Placeholder">
  <div class="card-body">
    <h3>Card Title</h3>
    <p>This is a sample card description for testing.</p>
    <a href="#" class="btn">Learn More</a>
  </div>
</div>`
    };

    const generator = templates[type];

    if (!generator) {
      state.text = 'Available types: page, form, table, card';
      return;
    }

    state.text = generator();
  } catch (error) {
    state.postError("Error generating HTML: " + error.message);
  }
}

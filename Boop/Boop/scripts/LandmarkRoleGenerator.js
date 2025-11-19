/**
  {
    "api": 1,
    "name": "Landmark Role Generator",
    "description": "Generate HTML5 semantic landmarks with ARIA roles",
    "author": "Boop",
    "icon": "map",
    "tags": "landmark,aria,role,semantic,accessibility"
  }
**/

function main(state) {
  try {
    const type = state.text.trim().toLowerCase() || 'template';

    const landmarks = {
      template: `<!-- Full page landmark structure -->
<header role="banner">
  <nav role="navigation" aria-label="Main navigation">
    <!-- Navigation links -->
  </nav>
</header>

<main role="main">
  <article role="article">
    <header>
      <h1>Article Title</h1>
    </header>
    <!-- Article content -->
  </article>

  <aside role="complementary" aria-label="Related content">
    <!-- Sidebar content -->
  </aside>
</main>

<footer role="contentinfo">
  <!-- Footer content -->
</footer>`,

      navigation: `<nav role="navigation" aria-label="Main navigation">
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/about">About</a></li>
  </ul>
</nav>`,

      search: `<div role="search">
  <form>
    <label for="search-input">Search:</label>
    <input type="search" id="search-input" aria-label="Search this site"/>
    <button type="submit">Search</button>
  </form>
</div>`,

      banner: `<header role="banner">
  <div>
    <h1>Site Title</h1>
    <p>Site tagline</p>
  </div>
</header>`,

      main: `<main role="main" id="main-content">
  <h1>Page Title</h1>
  <!-- Main page content -->
</main>`,

      complementary: `<aside role="complementary" aria-labelledby="sidebar-title">
  <h2 id="sidebar-title">Related Information</h2>
  <!-- Sidebar content -->
</aside>`,

      contentinfo: `<footer role="contentinfo">
  <p>&copy; 2024 Company Name</p>
  <nav aria-label="Footer navigation">
    <!-- Footer links -->
  </nav>
</footer>`,

      region: `<section role="region" aria-labelledby="region-title">
  <h2 id="region-title">Section Title</h2>
  <!-- Section content -->
</section>`
    };

    const landmark = landmarks[type];

    if (!landmark) {
      const available = Object.keys(landmarks).join(', ');
      state.text = `Available landmarks: ${available}`;
      return;
    }

    state.text = landmark;
  } catch (error) {
    state.postError("Error generating landmark: " + error.message);
  }
}

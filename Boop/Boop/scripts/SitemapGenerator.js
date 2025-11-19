/**
  {
    "api": 1,
    "name": "Sitemap Generator",
    "description": "Generate XML sitemap (input: URLs, one per line)",
    "author": "Boop",
    "icon": "map",
    "tags": "sitemap,xml,seo,urls"
  }
**/

function main(state) {
  try {
    const urls = state.text.trim().split('\n').filter(u => u.trim());

    if (urls.length === 0) {
      state.text = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/</loc>
    <lastmod>2024-01-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://example.com/about</loc>
    <lastmod>2024-01-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`;
      state.postInfo("Sample sitemap generated. Provide URLs to generate custom sitemap.");
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    const entries = [];

    for (const url of urls) {
      const trimmed = url.trim();
      if (!trimmed) continue;

      // Determine priority based on URL depth
      const depth = (trimmed.match(/\//g) || []).length;
      let priority = '0.5';
      if (depth <= 3) priority = '1.0';
      else if (depth <= 4) priority = '0.8';
      else if (depth <= 5) priority = '0.6';

      entries.push(`  <url>
    <loc>${trimmed}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`);
    }

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</urlset>`;

    state.text = sitemap;
    state.postInfo(`Generated sitemap with ${urls.length} URL(s)`);
  } catch (error) {
    state.postError("Error generating sitemap: " + error.message);
  }
}

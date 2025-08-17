// scripts/generate-sitemap.js
const fs = require("fs");
const BASE = "https://goatourwala.com"; // change
const paths = [
  "/cruise-in-goa/adventure-cruise",
  "/cruise-in-goa/adventure-cruise-with-watersports",
  "/cruise-in-goa/dinner-cruise",
  "/cruise-in-goa/sunset-cruise",
  "/cruise-in-goa/yacht-on-rent",
  "/cruise-in-goa/cruise-on-rent",
  "/sightseen/north-goa-sightseen",
  "/sightseen/south-goa-sightseen",
  "/sightseen/dolphin-sightseen-tour",
  "/adventure-sports/scuba-diving",
  "/adventure-sports/flyboarding",
  "/adventure-sports/bungee-jumping",
  "/adventure-sports/dudhsagar-waterfall-tour",
  "/adventure-sports/crocodile-trip-in-goa",
  "/scuba-with-watersports/scuba-combo-tour-at-grand-island",
  "/scuba-with-watersports/scuba-with-watersports-at-malvan",
  "/tour-packages/goa-honeymoon-package",
  "/tour-packages/goa-tour-packages",
  "/tour-packages/business-tour-package",
  "/tour-packages/family-tour-package",
  "/tour-packages/adventure-tour-package",
  "/tour-packages/goa-hampi-tour",
  "/tour-packages/goa-murudeshwar",
  "/tour-packages/wildernest-nature-trip",
  "/tour-packages/houseboat"
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths
  .map(
    (p) => `  <url>
    <loc>${BASE}${p}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

fs.writeFileSync("public/sitemap.xml", xml);
console.log("sitemap.xml written to public/sitemap.xml");

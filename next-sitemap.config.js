// next-sitemap.config.js

module.exports = {
  siteUrl: "https://tafsiri.site",
  generateRobotsTxt: true, // Generate robots.txt
  sitemapSize: 5000,
  changefreq: "weekly",
  priority: 0.7,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  },
};

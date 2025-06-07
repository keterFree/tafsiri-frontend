// next-seo.config.js

const siteUrl = "https://tafsiri.site";

export default {
  title: "Tafsiri | Translate Kenyan Languages to English and Back",
  description:
    "Tafsiri.site is a powerful platform for translating between English and major Kenyan languages like Kiswahili, Kalenjin, Dholuo, Gikuyu, Somali, and Maasai. Empowering communities through accurate and accessible language translation.",
  canonical: siteUrl,
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: siteUrl,
    site_name: "Tafsiri",
    title: "Tafsiri | Translate Kenyan Languages to English and Back",
    description:
      "Tafsiri.site enables fast and reliable translation between English and native Kenyan languages such as Kiswahili, Kalenjin, Dholuo, Gikuyu, Somali, and Maasai. Join our mission to preserve and empower African languages.",
    images: [
      {
        url: `${siteUrl}/taf.png`,
        width: 1200,
        height: 630,
        alt: "Tafsiri.site - Kenyan Language Translation",
      },
    ],
  },
  twitter: {
    handle: "@tafsiri_site",
    site: "@tafsiri_site",
    cardType: "summary_large_image",
  },
  additionalMetaTags: [
    {
      name: "keywords",
      content:
        "Tafsiri, Kenyan language translator, Kalenjin translation, Kiswahili translation, Gikuyu translator, Dholuo translator, Maasai translator, Somali to English, translate to English, English to Kalenjin, African languages, language preservation, AI translation Kenya, community translation platform",
    },
    {
      name: "author",
      content: "Tafsiri Team",
    },
    {
      name: "theme-color",
      content: "#317EFB",
    },
  ],
};

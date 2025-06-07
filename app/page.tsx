"use client";

import Head from "next/head";
import DashboardPage from "./dashboard/page";

export default function Home() {
  return (
    <>
      <Head>
        <title>Tafsiri | Preserving and Promoting Kenya’s native languages</title>
        <meta
          name="description"
          content="Tafsiri.site is a comprehensive platform dedicated to translating between English and major Kenyan languages including Kiswahili, Kalenjin, Dholuo, Gikuyu, Somali, and Maasai. Our mission is to preserve and promote indigenous African languages through fast, reliable, and user-friendly translation tools."
        />
        <meta
          name="keywords"
          content="Kenyan languages, translation, Kiswahili, Kalenjin, Dholuo, Gikuyu, Somali, Maasai, African languages, language preservation, open source translation, AI translation"
        />
        <meta name="author" content="Tafsiri Community" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://tafsiri.site" />

        {/* Open Graph Tags */}
        <meta
          property="og:title"
          content="Tafsiri | Translate Kenyan Languages to English and Back"
        />
        <meta
          property="og:description"
          content="Tafsiri.site provides fast, reliable translation between English and native Kenyan languages such as Kiswahili, Kalenjin, Dholuo, Gikuyu, Somali, and Maasai."
        />
        <meta property="og:url" content="https://tafsiri.site" />
        <meta property="og:site_name" content="Tafsiri" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_KE" />
        <meta property="og:image" content="https://tafsiri.site/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="Tafsiri.site - Kenyan Language Translation Platform"
        />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@tafsiri_site" />
        <meta name="twitter:creator" content="@tafsiri_site" />
        <meta
          name="twitter:title"
          content="Tafsiri | Translate Kenyan Languages to English and Back"
        />
        <meta
          name="twitter:description"
          content="Tafsiri.site provides fast, reliable translation between English and Kenyan languages."
        />
        <meta
          name="twitter:image"
          content="https://tafsiri.site/og-image.jpg"
        />
      </Head>

      <main>
        <DashboardPage />
      </main>
    </>
  );
}

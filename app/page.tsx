"use client";

import { NextSeo } from "next-seo";
import DashboardPage from "./dashboard/page";

export default function Home() {
  return (
    <>
      <NextSeo
        title="Tafsiri | Translate Kenyan Languages to English and Back"
        description={`Tafsiri.site is a comprehensive platform dedicated to translating between English and major Kenyan languages including Kiswahili, Kalenjin, Dholuo, Gikuyu, Somali, and Maasai. 
          Our mission is to preserve and promote indigenous African languages by providing fast, reliable, and user-friendly translation tools supported by community contributions and advanced AI models.`}
        canonical="https://tafsiri.site"
        additionalMetaTags={[
          {
            name: "keywords",
            content:
              "Kenyan languages, translation, Kiswahili, Kalenjin, Dholuo, Gikuyu, Somali, Maasai, African languages, language preservation, open source translation, AI translation",
          },
          {
            name: "author",
            content: "Tafsiri Community",
          },
          {
            name: "viewport",
            content: "width=device-width, initial-scale=1",
          },
        ]}
        openGraph={{
          url: "https://tafsiri.site",
          title: "Tafsiri | Translate Kenyan Languages to English and Back",
          description:
            "Tafsiri.site provides fast, reliable translation between English and native Kenyan languages such as Kiswahili, Kalenjin, Dholuo, Gikuyu, Somali, and Maasai. Join our mission to empower African languages through technology and community involvement.",
          images: [
            {
              url: "https://tafsiri.site/og-image.jpg",
              width: 1200,
              height: 630,
              alt: "Tafsiri.site - Kenyan Language Translation Platform",
              type: "image/jpeg",
            },
          ],
          site_name: "Tafsiri",
          locale: "en_KE",
          type: "website",
        }}
        twitter={{
          handle: "@tafsiri_site",
          site: "@tafsiri_site",
          cardType: "summary_large_image",
        }}
        // You can add Facebook App ID if available for better insights
        // facebook={{
        //   appId: "your_facebook_app_id",
        // }}
      />

      <main>
        <DashboardPage />
      </main>
    </>
  );
}

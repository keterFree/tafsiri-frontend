"use client";

import { NextSeo } from "next-seo";
import Hero from "./Hero";
import About from "./About";
import HowItWorks from "./HowItWorks";
import CallToAction from "./CallToAction";
import Footer from "../components/Footer";
import Navbar from "../components/navbar";

export default function HomePage() {
  return (
    <>
      <NextSeo
        title="Tafsiri | Bridging Kenyan Languages with English"
        description="Explore Tafsiri.site – a translation platform helping you understand and translate between English and Kiswahili, Dholuo, Kalenjin, Gikuyu, Somali, and Maasai."
        canonical="https://tafsiri.site"
        openGraph={{
          url: "https://tafsiri.site",
          title: "Tafsiri | Bridging Kenyan Languages with English",
          description:
            "Tafsiri.site helps you translate between English and major Kenyan languages such as Kiswahili, Kalenjin, Dholuo, Gikuyu, Somali, and Maasai. Free and accessible for all.",
          images: [
            {
              url: "https://tafsiri.site/og-image.jpg",
              width: 1200,
              height: 630,
              alt: "Tafsiri.site - Bridging Kenyan Languages with English",
            },
          ],
          site_name: "Tafsiri",
        }}
        twitter={{
          handle: "@tafsiri_site",
          site: "@tafsiri_site",
          cardType: "summary_large_image",
        }}
        additionalMetaTags={[
          {
            name: "keywords",
            content:
              "Tafsiri, translate Kiswahili, English to Kalenjin, Gikuyu translation, Somali to English, Kenyan languages, Dholuo, Maasai, language tools Kenya, cultural preservation, African language translation",
          },
        ]}
      />

      <main className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100">
        <Navbar />
        <Hero />
        <About />
        <HowItWorks />
        <CallToAction />
        <Footer />
      </main>
    </>
  );
}

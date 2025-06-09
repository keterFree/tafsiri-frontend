"use client";

// import { NextSeo } from "next-seo";
import Hero from "./Hero";
import About from "./About";
import HowItWorks from "./HowItWorks";
import CallToAction from "./CallToAction";
import Footer from "../components/Footer";
import Navbar from "../components/navbar";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100">
      <Navbar />
      <Hero />
      <About />
      <HowItWorks />
      <CallToAction />
      <Footer />
    </main>
  );
}

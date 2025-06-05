"use client";

import Footer from "../components/Footer";
import Navbar from "../components/navbar";
import CallToAction from "../dashboard/CallToAction";
import Contribute from "./contribute";

export default function ContributePage() {
  return (
    <>
      <Navbar />
      <main className="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100">
        <div className="w-full mx-auto grid md:grid-cols-3 gap-10">
          {/* Main Translator */}
          <div className="md:col-span-2">
            <h1 className="p-4 text-neutral-800 dark:text-neutral-100 text-4xl font-bold text-center md:text-left">
              Contribute English to Kalenjin
            </h1>

            <Contribute />
          </div>

          {/* Sidebar: Contribution Guidelines */}
          <aside className="p-6 text-green-800 dark:text-green-100 border-l border-emerald-400/50 min-h-full shadow h-fit">
            <div>
              <h2 className="text-lg font-semibold mb-2">
                Best Practices for Contributing
              </h2>
              <p className="text-sm">
                To ensure the Kalenjin translation model learns effectively,
                please follow these guidelines:
              </p>
              <ul className="list-disc list-inside text-sm mt-2 space-y-2">
                <li>
                  <span className="font-semibold">Use complete sentences:</span>{" "}
                  Avoid fragments or overly short phrases.
                </li>
                <li>
                  <span className="font-semibold">Avoid slang or idioms:</span>{" "}
                  Use clear, formal English to improve model understanding.
                </li>
                <li>
                  <span className="font-semibold">Ensure correct grammar:</span>{" "}
                  The model trains better with properly punctuated sentences.
                </li>
                <li>
                  <span className="font-semibold">Keep it natural:</span>{" "}
                  Use everyday phrases or conversational examples you might
                  actually say in real life.
                </li>
                <li>
                  <span className="font-semibold">Respect culture:</span>{" "}
                  Avoid offensive, inappropriate, or culturally insensitive
                  content.
                </li>
                <li>
                  <span className="font-semibold">One idea per sentence:</span>{" "}
                  Simpler inputs make translation more accurate.
                </li>
              </ul>
              <p className="mt-4 text-sm">
                High-quality contributions help create more accurate, inclusive,
                and useful tools for preserving the Kalenjin language.
              </p>
            </div>

            <h2 className="text-xl font-semibold my-4">Why Contribute?</h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-4">
              Your input trains the next generation of AI tools for Kalenjin.
              Every sentence you share helps improve language access,
              representation, and digital inclusion.
            </p>

            <h3 className="font-semibold text-neutral-700 dark:text-neutral-200 mb-2">
              How to Get Started
            </h3>
            <ul className="list-disc list-inside text-sm text-neutral-600 dark:text-neutral-300 space-y-1">
              <li>Type a complete English sentence in the box.</li>
              <li>Click “Contribute”.</li>
              <li>Review or refine the Kalenjin translation.</li>
              <li>Check back often — new features are coming soon!</li>
            </ul>
          </aside>
        </div>
      </main>

      {/* Call to Action */}
      <CallToAction />
      <Footer />
    </>
  );
}

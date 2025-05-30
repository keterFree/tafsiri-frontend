"use client";

import Footer from "../components/Footer";
import Navbar from "../components/navbar";
import CallToAction from "../dashboard/CallToAction";
import Translate from "./translate";

export default function TranslatePage() {
  return (
    <>
      <Navbar />
      <main className="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100">
        <div className="w-full mx-auto grid md:grid-cols-3 gap-10">
          {/* Main Translator */}
          <div className="md:col-span-2">
            <h1 className="p-4 text-neutral-800 dark:text-neutral-100 text-4xl font-bold text-center md:text-left">
              Translate English to Kalenjin
            </h1>

            <Translate />

            {/* Contribution Message */}
          </div>

          {/* Sidebar */}
          <aside className="p-6  text-green-800 dark:text-green-100 border-l border-emerald-400/50  min-h-full shadow h-fit">
            <div className="">
              <h2 className="text-lg font-semibold mb-2">
                Why Your Contributions Matter
              </h2>
              <p className="text-sm">
                This translation model is still developing. Out of the total
                training data:
              </p>
              <ul className="list-disc list-inside text-sm mt-2 space-y-1">
                <li>~30,000 examples come from Bible translations.</li>
                <li>~3,000 examples were scraped from the web.</li>
                <li>~2,000 examples were contributed by people like you.</li>
              </ul>
              <p className="mt-3 text-sm">
                The more sentence pairs we collect, the smarter and more
                accurate the model becomes — especially for daily,
                conversational Kalenjin.
                <span className="font-semibold">
                  {" "}
                  You can directly shape the future of this tool by
                  contributing!
                </span>
              </p>
            </div>
            <h2 className="text-xl font-semibold my-4">Why Tafsiri?</h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-4">
              Indigenous languages like Kalenjin are at risk of being digitally
              excluded. Tafsiri is a community-first effort to build tools that
              preserve and promote these languages in the modern world.
            </p>
            <h3 className="font-semibold text-neutral-700 dark:text-neutral-200 mb-2">
              How to Use
            </h3>
            <ul className="list-disc list-inside text-sm text-neutral-600 dark:text-neutral-300 space-y-1">
              <li>Type an English sentence in the box.</li>
              <li>Click “Translate”.</li>
              <li>Review and share the Kalenjin translation.</li>
              <li>Flag or correct inaccurate results (feature coming soon).</li>
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

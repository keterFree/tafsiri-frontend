import { Wand2, Upload, Languages } from "lucide-react";

const steps = [
  {
    title: "1. Translate",
    desc: "Use our web-based translator to convert English sentences into Kalenjin. It’s simple, fast, and evolving with every contribution.",
    icon: Wand2,
  },
  {
    title: "2. Contribute",
    desc: "Submit real-world English–Kalenjin sentence pairs or corrections. Each submission helps improve the model’s accuracy and usability.",
    icon: Upload,
  },
  {
    title: "3. Expand",
    desc: "Join us in scaling Tafsiri to cover other Kenyan languages — your laguage — and build digital equity for all.",
    icon: Languages,
  },
];

export default function HowItWorks() {
  return (
    <section className="py-4 px-4 sm:px-6 lg:px-8 bg-neutral-50 dark:bg-neutral-800">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-headline mb-2 text-2xl sm:text-3xl font-semibold text-center text-neutral-800 dark:text-neutral-100">
          How Tafsiri Works — In Three Steps
        </h2>

        <div className="grid sm:grid-cols-3 gap-16 sm:gap-8 my-4 sm:mt-4">
          {steps.map(({ title, desc, icon: Icon }, i) => (
            <div className="text-center" key={title}>
              <div className="relative w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32 mx-auto left-2">
                <div className="z-10 relative w-full h-full bg-white dark:bg-neutral-900 rounded-full border border-gray-300 dark:border-neutral-700 shadow flex items-center justify-center">
                  <Icon
                    className="text-emerald-500 w-1/2 h-1/2"
                    strokeWidth={1.5}
                  />
                </div>
                <div className="absolute inset-0 -translate-x-2 -translate-y-2 bg-emerald-500 rounded-full"></div>
              </div>
              <h3 className="font-headline text-xl sm:text-2xl mt-2 sm:mt-2 text-neutral-800 dark:text-neutral-100">
                {title}
              </h3>
              <p className="leading-relaxed mt-4 text-neutral-600 dark:text-neutral-300">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

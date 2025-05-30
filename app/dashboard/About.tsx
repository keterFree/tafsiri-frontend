import Link from "next/link";

export default function About() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50 dark:from-neutral-900 dark:to-neutral-800">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 mb-4">
            Language Preservation
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            The{" "}
            <span className="text-green-600 dark:text-green-400">Tafsiri</span>{" "}
            Project
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Bridging the digital language divide for Kenya's indigenous
            communities
          </p>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Indigenous Kenyan languages are at risk of being digitally excluded.
            Tafsiri is a community-first effort to build tools that preserve and
            promote these languages in the modern world.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 mt-1.5">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                  <GlobeIcon className="h-5 w-5" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Our Mission
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  To create open language tools that preserve and promote
                  Kenya's linguistic heritage through community-powered
                  technology.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 mt-1.5">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                  <UsersIcon className="h-5 w-5" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Community First
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Every translation improvement comes from native speakers.
                  We're building tools with and for the communities we serve.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 mt-1.5">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
                  <CpuIcon className="h-5 w-5" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Technology
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Using open-source machine learning to create accessible
                  translation tools that work offline for rural areas.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-800 p-8 rounded-xl shadow-xl border border-emerald-200 dark:border-emerald-700">
            <h3 className=" font-bold text-gray-900 dark:text-white mb-6">
              What we solve with tafsiri?
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">
                  millions of speakers with limited digital resources
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">
                  Strong oral traditions needing preservation
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">
                  Community enthusiasm for language technology
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">
                  greenprint for expanding to all Kenyan languages
                </span>
              </li>
            </ul>
            <h3 className="mt-4 font-bold text-gray-900 dark:text-white mb-6">
              You can directly shape the future by contributing!
            </h3>
            <div className="mt-8 gap-1 flex ">
              <Link
                href="https://ketertitus.info/"
                className="inline-flex items-center px-6 py-3 border text-base font-medium rounded-md shadow-sm hover:text-white border-emerald-800 text-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors"
              >
                Get in touch
              </Link>
              <Link
                href="/contribute"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
              >
                Join the Movement
                <ArrowRightIcon className="ml-2 -mr-1 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// You'll need these icons - install from @heroicons/react
function GlobeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function UsersIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  );
}

function CpuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
      />
    </svg>
  );
}

function CheckCircleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function ArrowRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M14 5l7 7m0 0l-7 7m7-7H3"
      />
    </svg>
  );
}

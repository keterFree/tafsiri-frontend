"use client";

import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section
      className="text-gray-600 flex flex-col justify-center body-font min-h-screen bg-cover object-left bg-center bg-no-repeat relative dark:bg-neutral-900"
      style={{
        backgroundImage: "url('/people.jpg')", // Make sure this file exists in /public/images/
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r  from-neutral-900/80  dark:via-neutral-900/80 to-transparent "></div>

      <div className="container mx-auto flex md:px-24 md:py-20 md:flex-row flex-col md:items-center relative z-10 p-3 items-start">
        {/* Left Side (Text) */}
        <div className="lg:flex-grow max-w-xl mt-5 md:mt-0 md:w-1.5/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="text-3xl flex md:items-center items-start flex-col md:flex-row sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-gray-100 mb-4">
            <Image
              src="/taf.png"
              alt="Tafsiri Logo"
              width={274}
              height={66}
              priority
            />
            <span className="ml-2 text-gray-300">Project</span>
          </h1>
          <p className="mb-8 leading-relaxed md:text-center text-start text-gray-300 px-2 md:px-0">
            A community-driven initiative to preserve and promote Kenya’s native
            languages — starting with
            <span className="font-semibold"> Kalenjin</span>. Translate,
            contribute, and be part of building Africa’s language technology
            future.
          </p>
          <div className="flex justify-center">
            <Link href="/translate">
              <button className="inline-flex text-white bg-emerald-600 border-0 py-2 px-6 focus:outline-none hover:bg-green-500 rounded text-lg">
                Start Translating
              </button>
            </Link>
            <Link href="/contribute">
              <button className="ml-4 inline-flex text-gray-100 bg-transparent border border-emerald-500 py-2 px-6 focus:outline-none hover:bg-green-600 dark:hover:bg-gray-700 rounded text-lg">
                Contribute Sentences
              </button>
            </Link>
          </div>
        </div>

        {/* Right Side (Image) */}
        <div className="lg:max-w-lg lg:w-full mb-5 md:mb-0 md:w-1/2 w-3/6"></div>
      </div>
    </section>
  );
}

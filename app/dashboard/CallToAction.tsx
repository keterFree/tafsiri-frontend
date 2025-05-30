"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export default function CallToAction() {
  return (
    <section className=" border-t border-emerald-400/50 relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white dark:from-neutral-900 dark:to-neutral-800 overflow-hidden">
      {/* Floating decorative elements */}
      <div className="absolute top-0 left-0 w-full overflow-hidden opacity-10 dark:opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 right-20 w-64 h-64 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-20 left-1/2 w-64 h-64 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Image with modern frame */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="relative aspect-square">
            <Image
              src="/Kenya-flag-ink.png"
              alt="Kenyan flag with digital language elements"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="absolute -bottom-6 -right-6 bg-white dark:bg-neutral-700 px-4 py-2 rounded-lg shadow-lg border border-gray-100 dark:border-neutral-600">
            <span className="font-medium text-sm text-gray-800 dark:text-white">
              Language Preservation in Action
            </span>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-emerald-600 dark:from-emerald-200 dark:to-emerald-500">
            Join the Tafsiri Movement
          </h2>

          <p className="text-xl text-gray-600 dark:text-gray-300">
            Kalenjin is just the beginning. We're building digital tools to
            preserve and empower all Kenyan languages — from Kikuyu to Dholuo,
            Luhya, Kisii, and beyond.
          </p>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                  ✓
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                Every sentence you contribute helps train smarter translation
                models
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                  ✓
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                Your input directly preserves language for future generations
              </p>
            </div>
          </div>

          <div className="pt-4">
            <Link
              href="/contribute"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:brightness-110 group"
            >
              Get Involved Now
              <ArrowRightIcon className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400 pt-2">
            Want to help directly?{" "}
            <Link
              href="/contribute"
              className="font-medium text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              Submit sentence pairs or corrections
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

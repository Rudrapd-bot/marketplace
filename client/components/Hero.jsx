"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
      <div className="max-w-7xl mx-auto px-6 py-28 text-center">

        <h1 className="text-6xl font-bold leading-tight">
          Showcase Your
          <br />
          Amazing Projects 🚀
        </h1>

        <p className="mt-8 text-xl text-blue-100 max-w-3xl mx-auto">
          Build your developer portfolio, share your work,
          and connect with recruiters, collaborators,
          and fellow developers.
        </p>

        <div className="mt-10 flex justify-center gap-5">

          <Link
            href="/explore"
            className="bg-white text-blue-700 px-7 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Explore Projects
          </Link>

          <Link
            href="/register"
            className="border border-white px-7 py-3 rounded-lg hover:bg-white hover:text-blue-700 transition"
          >
            Get Started
          </Link>

        </div>

      </div>
    </section>
  );
}
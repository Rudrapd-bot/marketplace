"use client";

import Link from "next/link";

export default function ProjectCard({ project }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">

      <img
        src={`http://localhost:5000/uploads/${project.image}`}
        alt={project.title}
        className="w-full h-52 object-cover"
      />

      <div className="p-5">

        <h2 className="text-2xl font-bold">
          {project.title}
        </h2>

        <p className="text-gray-600 mt-3">
          {project.shortDescription}
        </p>

        <p className="mt-4 text-sm text-gray-500">
          By <span className="font-semibold">{project.user?.name}</span>
        </p>

        <Link
          href={`/projects/${project._id}`}
          className="inline-block mt-5 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          View Details
        </Link>

      </div>

    </div>
  );
}
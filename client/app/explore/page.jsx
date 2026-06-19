"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllProjects } from "../services/projectService";

export default function ExplorePage() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    filterProjects();
  }, [search, projects]);

  const fetchProjects = async () => {
    try {
      const res = await getAllProjects();

      setProjects(res.data.projects || []);
      setFilteredProjects(res.data.projects || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const filterProjects = () => {
    const filtered = projects.filter((project) => {
      const title = project.title?.toLowerCase() || "";
      const tech = Array.isArray(project.techStack)
        ? project.techStack.join(" ").toLowerCase()
        : "";

      return (
        title.includes(search.toLowerCase()) ||
        tech.includes(search.toLowerCase())
      );
    });

    setFilteredProjects(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <div className="bg-blue-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">

          <h1 className="text-5xl font-bold">
            Explore Projects
          </h1>

          <p className="mt-3 text-blue-100">
            Discover amazing projects created by developers.
          </p>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Search */}
        <input
          type="text"
          placeholder="Search by title or tech stack..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-lg p-4 mb-10 shadow-sm"
        />

        {/* Loading */}
        {loading ? (
          <div className="text-center text-2xl font-semibold">
            Loading Projects...
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center text-2xl font-semibold">
            No Projects Found
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {filteredProjects.map((project) => (

              <div
                key={project._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition"
              >

                <img
                  src={`http://localhost:5000/uploads/${project.image}`}
                  alt={project.title}
                  className="w-full h-52 object-cover"
                />

                <div className="p-5">

                  <h2 className="text-2xl font-bold">
                    {project.title}
                  </h2>

                  <p className="text-gray-600 mt-3 line-clamp-2">
                    {project.shortDescription}
                  </p>

                  <div className="mt-4">

                    <h3 className="font-semibold">
                      Tech Stack
                    </h3>

                    <div className="flex flex-wrap gap-2 mt-2">

                      {project.techStack?.map((tech, index) => (

                        <span
                          key={index}
                          className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                        >
                          {tech}
                        </span>

                      ))}

                    </div>

                  </div>

                  <p className="mt-5 text-gray-500">
                    By{" "}
                    <span className="font-semibold">
                      {project.user?.name}
                    </span>
                  </p>

                  <Link
                    href={`/projects/${project._id}`}
                    className="inline-block mt-5 bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
                  >
                    View Details
                  </Link>

                </div>

              </div>

            ))}

          </div>
        )}

      </div>

    </div>
  );
}
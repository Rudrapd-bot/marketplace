"use client";

import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import ProjectCard from "../components/ProjectCard";
import { getAllProjects } from "./services/projectService";

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const res = await getAllProjects();

      console.log(res.data);

      setProjects(res.data.projects || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Hero />

      <section className="max-w-7xl mx-auto py-20 px-6">

        <h2 className="text-4xl font-bold text-center">
          Latest Projects
        </h2>

        <p className="text-center text-gray-500 mt-3">
          Discover amazing projects created by developers.
        </p>

        {loading ? (
          <div className="text-center mt-10 text-xl">
            Loading Projects...
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center mt-10 text-xl">
            No Projects Found
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">

            {projects.map((project) => (
              <ProjectCard
                key={project._id}
                project={project}
              />
            ))}

          </div>
        )}

      </section>

      <section className="bg-gray-50 py-20">

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center">
            Why ProjectHub?
          </h2>

          <div className="grid md:grid-cols-3 gap-10 mt-14">

            <div className="bg-white p-8 rounded-xl shadow">
              <h3 className="text-2xl font-semibold">
                🚀 Showcase
              </h3>

              <p className="mt-4 text-gray-600">
                Display your projects with beautiful images,
                GitHub links and live demos.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow">
              <h3 className="text-2xl font-semibold">
                🤝 Connect
              </h3>

              <p className="mt-4 text-gray-600">
                Let recruiters and developers contact you directly.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow">
              <h3 className="text-2xl font-semibold">
                💼 Build Portfolio
              </h3>

              <p className="mt-4 text-gray-600">
                Create an online portfolio to impress employers.
              </p>
            </div>

          </div>

        </div>

      </section>
    </>
  );
}
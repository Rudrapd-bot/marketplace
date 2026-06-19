"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getProjectById } from "../../services/projectService";

export default function ProjectDetails() {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProject();
  }, []);

  const fetchProject = async () => {
    try {
      const res = await getProjectById(id);
      setProject(res.data.project);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-20 text-2xl">
        Loading...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="text-center mt-20 text-2xl">
        Project Not Found
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">

      <img
        src={`http://localhost:5000/uploads/${project.image}`}
        alt={project.title}
        className="w-full h-[450px] object-cover rounded-xl"
      />

      <h1 className="text-5xl font-bold mt-8">
        {project.title}
      </h1>

      <p className="text-gray-500 mt-4">
        {project.shortDescription}
      </p>

      <div className="mt-8">
        <h2 className="text-2xl font-bold">
          Description
        </h2>

        <p className="mt-4 leading-8">
          {project.description}
        </p>
      </div>

      <div className="mt-10">

        <h2 className="text-2xl font-bold">
          Tech Stack
        </h2>

        <div className="flex flex-wrap gap-3 mt-4">

          {project.techStack?.map((tech, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full"
            >
              {tech}
            </span>
          ))}

        </div>

      </div>

      <div className="flex gap-5 mt-10">

        {project.githubLink && (
          <a
            href={project.githubLink}
            target="_blank"
            className="bg-gray-900 text-white px-6 py-3 rounded-lg"
          >
            GitHub
          </a>
        )}

        {project.liveDemo && (
          <a
            href={project.liveDemo}
            target="_blank"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Live Demo
          </a>
        )}

      </div>

      <div className="mt-14 bg-gray-100 rounded-xl p-6">

        <h2 className="text-2xl font-bold">
          Project Creator
        </h2>

        <div className="flex items-center gap-5 mt-5">

          <img
            src={
              project.user?.profileImage
                ? `http://localhost:5000/uploads/${project.user.profileImage}`
                : "/default-avatar.png"
            }
            alt="creator"
            className="w-20 h-20 rounded-full object-cover"
          />

          <div>

            <h3 className="text-xl font-semibold">
              {project.user?.name}
            </h3>

            <p>{project.user?.email}</p>

          </div>

        </div>

      </div>

    </div>
  );
}
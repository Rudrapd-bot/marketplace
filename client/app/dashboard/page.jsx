"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import ProtectedRoute from "../../components/ProtectedRoute";
import { useAuth } from "../context/authContext";
import { getMyProjects , deleteProject } from "../services/projectService";
// import { getMyProjects } from "../services/projectService";

export default function Dashboard() {
  const { user } = useAuth();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await getMyProjects();

      console.log(res.data);

      setProjects(res.data.projects || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this project?"
  );

  if (!confirmDelete) return;

  try {
    await deleteProject(id);

    // Remove the deleted project from the UI
    setProjects((prevProjects) =>
      prevProjects.filter((project) => project._id !== id)
    );

    alert("Project deleted successfully.");
  } catch (error) {
    console.error(error);
    alert("Failed to delete project.");
  }
};

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100">

        {/* Header */}
        <div className="bg-blue-600 text-white py-10">
          <div className="max-w-7xl mx-auto px-6">
            <h1 className="text-4xl font-bold">
              Welcome, {user?.name} 👋
            </h1>

            <p className="mt-2">
              Manage your projects from one place.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-10">

          {/* Buttons */}
          <div className="flex gap-4 mb-8">

            <Link
              href="/projects/add"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg"
            >
              + Add Project
            </Link>

            <Link
              href="/profile"
              className="bg-green-600 text-white px-6 py-3 rounded-lg"
            >
              My Profile
            </Link>

          </div>

          {/* Projects */}

          <h2 className="text-3xl font-bold mb-6">
            My Projects
          </h2>

          {loading ? (
            <h2>Loading...</h2>
          ) : projects.length === 0 ? (
            <div className="bg-white rounded-xl shadow p-8 text-center">

              <h2 className="text-2xl font-bold">
                No Projects Found
              </h2>

              <p className="text-gray-500 mt-3">
                Add your first project.
              </p>

            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

              {projects.map((project) => (

                <div
                  key={project._id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden"
                >

                  {project.image && (
                    <img
                      src={`http://localhost:5000/uploads/${project.image}`}
                      alt={project.title}
                      className="w-full h-52 object-cover"
                    />
                  )}

                  <div className="p-5">

                    <h3 className="text-2xl font-bold">
                      {project.title}
                    </h3>

                    <p className="text-gray-600 mt-3">
                      {project.shortDescription}
                    </p>

                    <div className="flex gap-3 mt-5">

                      <Link
                        href={`/projects/${project._id}`}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                      >
                        View
                      </Link>

                      <Link
                        href={`/projects/edit/${project._id}`}
                        className="bg-yellow-500 text-white px-4 py-2 rounded"
                      >
                        Edit
                      </Link>

                      <button
  onClick={() => handleDelete(project._id)}
  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
>
  Delete
</button>

                    </div>

                  </div>

                </div>

              ))}

            </div>
          )}

        </div>

      </div>
    </ProtectedRoute>
  );
}
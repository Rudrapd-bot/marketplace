"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProject } from "../../services/projectService";

export default function AddProjectPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    description: "",
    techStack: "",
    githubLink: "",
    liveDemo: "",
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle Image
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();

      data.append("title", formData.title);
      data.append("shortDescription", formData.shortDescription);
      data.append("description", formData.description);
      data.append("techStack", formData.techStack);
      data.append("githubLink", formData.githubLink);
      data.append("liveDemo", formData.liveDemo);

      if (image) {
        data.append("image", image);
      }

      await createProject(data);

      alert("Project Added Successfully!");

      router.push("/dashboard");

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to create project."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">

        <h1 className="text-3xl font-bold mb-8 text-center">
          Add New Project
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block mb-2 font-medium">
              Project Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter project title"
              className="w-full border rounded-lg p-3"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Short Description
            </label>

            <input
              type="text"
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              placeholder="One line description"
              className="w-full border rounded-lg p-3"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Description
            </label>

            <textarea
              rows="5"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write about your project..."
              className="w-full border rounded-lg p-3"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Tech Stack
            </label>

            <input
              type="text"
              name="techStack"
              value={formData.techStack}
              onChange={handleChange}
              placeholder="React, Node.js, Express, MongoDB"
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              GitHub Repository
            </label>

            <input
              type="url"
              name="githubLink"
              value={formData.githubLink}
              onChange={handleChange}
              placeholder="https://github.com/username/project"
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Live Demo
            </label>

            <input
              type="url"
              name="liveDemo"
              value={formData.liveDemo}
              onChange={handleChange}
              placeholder="https://your-project.vercel.app"
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Project Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            {loading ? "Uploading..." : "Add Project"}
          </button>

        </form>

      </div>
    </div>
  );
}
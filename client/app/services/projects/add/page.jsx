"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProject } from "../../../services/projectService";

export default function AddProject() {
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

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

      alert("Project Added Successfully");

      router.push("/dashboard/projects");

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to create project"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">

      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">

        <h1 className="text-3xl font-bold mb-8">
          Add New Project
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="text"
            name="title"
            placeholder="Project Title"
            className="w-full border p-3 rounded-lg"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="shortDescription"
            placeholder="Short Description"
            className="w-full border p-3 rounded-lg"
            value={formData.shortDescription}
            onChange={handleChange}
            required
          />

          <textarea
            rows="5"
            name="description"
            placeholder="Project Description"
            className="w-full border p-3 rounded-lg"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="techStack"
            placeholder="React, Node, Express, MongoDB"
            className="w-full border p-3 rounded-lg"
            value={formData.techStack}
            onChange={handleChange}
          />

          <input
            type="url"
            name="githubLink"
            placeholder="GitHub Repository"
            className="w-full border p-3 rounded-lg"
            value={formData.githubLink}
            onChange={handleChange}
          />

          <input
            type="url"
            name="liveDemo"
            placeholder="Live Demo URL"
            className="w-full border p-3 rounded-lg"
            value={formData.liveDemo}
            onChange={handleChange}
          />

          <input
            type="file"
            accept="image/*"
            className="w-full border p-3 rounded-lg"
            onChange={handleImage}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            {loading ? "Uploading..." : "Add Project"}
          </button>

        </form>

      </div>

    </div>
  );
}
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ProtectedRoute from "../../../../components/ProtectedRoute";
import {
  getProjectById,
  updateProject,
} from "../../../services/projectService";

export default function EditProjectPage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [techStack, setTechStack] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [liveDemo, setLiveDemo] = useState("");

  const [currentImage, setCurrentImage] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchProject();
  }, []);

  const fetchProject = async () => {
    try {
      const res = await getProjectById(id);

      const project = res.data.project;

      setTitle(project.title || "");
      setShortDescription(project.shortDescription || "");
      setDescription(project.description || "");
      setTechStack(project.techStack?.join(", ") || "");
      setGithubLink(project.githubLink || "");
      setLiveDemo(project.liveDemo || "");
      setCurrentImage(project.image || "");
    } catch (err) {
      console.log(err);
      alert("Unable to load project.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);

    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("shortDescription", shortDescription);
      formData.append("description", description);
      formData.append("techStack", techStack);
      formData.append("githubLink", githubLink);
      formData.append("liveDemo", liveDemo);

      if (image) {
        formData.append("image", image);
      }

      await updateProject(id, formData);

      alert("Project Updated Successfully");

      router.push("/dashboard");
    } catch (err) {
      console.log(err);
      alert("Update Failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto py-10 px-6">

        <h1 className="text-4xl font-bold mb-8">
          Edit Project
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow rounded-xl p-8 space-y-5"
        >

          <input
            type="text"
            placeholder="Project Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-3 rounded"
            required
          />

          <input
            type="text"
            placeholder="Short Description"
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            className="w-full border p-3 rounded"
            required
          />

          <textarea
            rows={6}
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border p-3 rounded"
            required
          />

          <input
            type="text"
            placeholder="React, Node, MongoDB"
            value={techStack}
            onChange={(e) => setTechStack(e.target.value)}
            className="w-full border p-3 rounded"
          />

          <input
            type="url"
            placeholder="GitHub Link"
            value={githubLink}
            onChange={(e) => setGithubLink(e.target.value)}
            className="w-full border p-3 rounded"
          />

          <input
            type="url"
            placeholder="Live Demo"
            value={liveDemo}
            onChange={(e) => setLiveDemo(e.target.value)}
            className="w-full border p-3 rounded"
          />

          {currentImage && (
            <div>
              <p className="font-semibold mb-2">
                Current Image
              </p>

              <img
                src={`http://localhost:5000/uploads/${currentImage}`}
                alt="Project"
                className="w-full h-60 object-cover rounded"
              />
            </div>
          )}

          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full"
          />

          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700"
          >
            {saving ? "Updating..." : "Save Changes"}
          </button>

        </form>

      </div>
    </ProtectedRoute>
  );
}
"use client";

import ProtectedRoute from "../../components/ProtectedRoute";
import { useAuth } from "../context/authContext";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <div className="max-w-5xl mx-auto py-10 px-6">

        <h1 className="text-4xl font-bold mb-8">
          My Profile
        </h1>

        <div className="bg-white shadow rounded-xl p-8">

          <p><strong>Name:</strong> {user?.name}</p>

          <p className="mt-3">
            <strong>Email:</strong> {user?.email}
          </p>

          <p className="mt-3">
            <strong>Bio:</strong> {user?.bio || "Not added"}
          </p>

          <p className="mt-3">
            <strong>GitHub:</strong> {user?.github || "Not added"}
          </p>

          <p className="mt-3">
            <strong>LinkedIn:</strong> {user?.linkedin || "Not added"}
          </p>

        </div>

      </div>
    </ProtectedRoute>
  );
}